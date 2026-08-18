import fs from "fs";
import path from "path";

export async function GET(request, { params }) {
  const id = params.id;
  const reportsDir = path.join(process.cwd(), "..", "reports");
  const filePath = path.join(reportsDir, `${id}.md`);
  
  try {
    if (!fs.existsSync(filePath)) {
      return Response.json({ error: "Report not found" }, { status: 404 });
    }
    
    const content = fs.readFileSync(filePath, "utf-8");
    return Response.json({ content });
  } catch (error) {
    console.error("Failed to read report", error);
    return Response.json({ error: "Failed to read report" }, { status: 500 });
  }
}
