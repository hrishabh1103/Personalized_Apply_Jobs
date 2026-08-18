import fs from "fs";
import path from "path";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get("target");

  const allowedTargets = {
    "cv": "cv.md",
    "pipeline": "data/pipeline.md"
  };

  if (!target || !allowedTargets[target]) {
    return Response.json({ error: "Invalid target" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "..", allowedTargets[target]);
  
  try {
    if (!fs.existsSync(filePath)) {
      return Response.json({ content: `File not found: ${allowedTargets[target]}` });
    }
    
    const content = fs.readFileSync(filePath, "utf-8");
    return Response.json({ content });
  } catch (error) {
    console.error(`Failed to read ${target}`, error);
    return Response.json({ error: "Failed to read file" }, { status: 500 });
  }
}
