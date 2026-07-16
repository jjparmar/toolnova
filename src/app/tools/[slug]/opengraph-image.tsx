import { ImageResponse } from"next/og";
import { getToolData } from"@/data/tools";

export const runtime ="edge";

export const alt ="ToolNova Tool";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType ="image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolData(slug);

  const name = tool?.name ||"AI Study Tools";
  const description =
    tool?.description ||"Free AI tools for students and professionals.";

  return new ImageResponse(
    <div
      style={{
        background:"linear-gradient(to bottom right, #0f172a, #1e293b)",
        color:"white",
        width:"100%",
        height:"100%",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        padding:"80px",
        fontFamily:"sans-serif",
      }}
    >
      <div
        style={{
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          marginBottom:"40px",
        }}
      >
        <div
          style={{
            background:"linear-gradient(to right, #9333ea, #2563eb)",
            backgroundClip:"text",
            color:"transparent",
            fontSize:"32px",
            fontWeight:"bold",
            display:"flex",
            alignItems:"center",
            gap:"12px",
          }}
        >
          ✨ ToolNova
        </div>
      </div>

      <h1
        style={{
          fontSize:"90px",
          fontWeight:"bold",
          background:"linear-gradient(to right, #fff, #cbd5e1)",
          backgroundClip:"text",
          color:"transparent",
          margin:"0 0 30px 0",
          textAlign:"center",
          lineHeight: 1.1,
        }}
      >
        {name}
      </h1>

      <p
        style={{
          fontSize:"40px",
          color:"#94a3b8",
          textAlign:"center",
          margin: 0,
          maxWidth:"900px",
          lineHeight: 1.4,
        }}
      >
        {description}
      </p>

      <div
        style={{
          position:"absolute",
          bottom:"50px",
          display:"flex",
          alignItems:"center",
          gap:"10px",
          fontSize:"24px",
          color:"#64748b",
        }}
      >
        toolnovahub.com
      </div>
    </div>,
    {
      ...size,
    },
  );
}
