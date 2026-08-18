import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "..", "data", "applications.md");
  
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    
    // Parse Markdown table
    const lines = fileContent.split("\n").filter(line => line.trim().startsWith("|"));
    if (lines.length <= 2) {
      return Response.json({ applications: [] });
    }
    
    const headers = lines[0].split("|").map(h => h.trim()).filter(Boolean);
    const applications = lines.slice(2).map(line => {
      const values = line.split("|").map(v => v.trim()).filter(Boolean);
      return headers.reduce((obj, header, index) => {
        obj[header.toLowerCase()] = values[index];
        return obj;
      }, {});
    });
    
    return Response.json({ applications });
  } catch (error) {
    console.error("Failed to read applications.md", error);
    return Response.json({ applications: [], error: "Failed to read data" }, { status: 500 });
  }
}
