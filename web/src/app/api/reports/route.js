import fs from "fs";
import path from "path";

export async function GET() {
  const reportsDir = path.join(process.cwd(), "..", "reports");
  
  try {
    if (!fs.existsSync(reportsDir)) {
      return Response.json({ reports: [] });
    }
    
    const files = fs.readdirSync(reportsDir).filter(f => f.endsWith('.md'));
    const reports = files.map(filename => {
      const filePath = path.join(reportsDir, filename);
      const content = fs.readFileSync(filePath, "utf-8");
      
      // Basic extraction of frontmatter/metadata lines
      const titleMatch = content.match(/# Evaluation:\s+(.+)/);
      const scoreMatch = content.match(/\*\*Score:\*\*\s+([\d.]+)/);
      const archetypeMatch = content.match(/\*\*Archetype:\*\*\s+(.+)/);
      const dateMatch = content.match(/\*\*Date:\*\*\s+([\d-]+)/);
      
      return {
        id: filename.replace('.md', ''),
        filename,
        title: titleMatch ? titleMatch[1] : filename,
        score: scoreMatch ? scoreMatch[1] : '?',
        archetype: archetypeMatch ? archetypeMatch[1] : 'unknown',
        date: dateMatch ? dateMatch[1] : 'unknown',
      };
    }).sort((a, b) => b.id.localeCompare(a.id)); // sort descending
    
    return Response.json({ reports });
  } catch (error) {
    console.error("Failed to read reports", error);
    return Response.json({ reports: [], error: "Failed to read data" }, { status: 500 });
  }
}
