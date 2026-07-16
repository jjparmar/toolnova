import { ImageResponse } from"next/og";
import { NextRequest } from"next/server";

export const runtime ="edge";

const SIZE = { width: 1200, height: 630 };

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const title = searchParams.get("title") ||"ToolNova";
  const description = searchParams.get("description") ||"";
  const category = searchParams.get("category") ||"";

  return new ImageResponse(
    <div
      style={{
        background:"linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #0ea5e9 100%)",
        width:"100%",
        height:"100%",
        display:"flex",
        flexDirection:"column",
        padding:"60px 80px",
        fontFamily:"sans-serif",
        position:"relative",
      }}
    >
      {/* ToolNova logo / brand mark — top-left */}
      <div
        style={{
          display:"flex",
          alignItems:"center",
          gap:"12px",
          marginBottom:"auto",
        }}
      >
        <div
          style={{
            fontSize:"28px",
            fontWeight:"bold",
            color:"rgba(255, 255, 255, 0.9)",
            display:"flex",
            alignItems:"center",
            gap:"8px",
          }}
        >
          ✨ ToolNova
        </div>
      </div>

      {/* Category badge — top-right */}
      {category && (
        <div
          style={{
            position:"absolute",
            top:"55px",
            right:"70px",
            background:"rgba(255, 255, 255, 0.2)",
            color:"white",
            padding:"8px 24px",
            borderRadius:"9999px",
            fontSize:"20px",
            fontWeight: 600,
            display:"flex",
          }}
        >
          {category}
        </div>
      )}

      {/* Main content — centered vertically */}
      <div
        style={{
          display:"flex",
          flexDirection:"column",
          justifyContent:"center",
          flex: 1,
        }}
      >
        <h1
          style={{
            fontSize: title.length > 40 ?"52px" :"64px",
            fontWeight:"bold",
            color:"white",
            margin:"0 0 20px 0",
            lineHeight: 1.15,
            maxWidth:"1000px",
          }}
        >
          {title}
        </h1>

        {description && (
          <p
            style={{
              fontSize:"28px",
              color:"rgba(255, 255, 255, 0.75)",
              margin: 0,
              lineHeight: 1.5,
              maxWidth:"900px",
              display:"flex",
            }}
          >
            {description.length > 120
              ?`${description.slice(0, 117)}...`
              : description}
          </p>
        )}
      </div>

      {/* Watermark — bottom-center */}
      <div
        style={{
          display:"flex",
          justifyContent:"center",
          width:"100%",
          fontSize:"22px",
          color:"rgba(255, 255, 255, 0.5)",
          fontWeight: 500,
        }}
      >
        toolnovahub.com
      </div>

      {/* Decorative circles */}
      <div
        style={{
          position:"absolute",
          top:"-120px",
          right:"-120px",
          width:"400px",
          height:"400px",
          borderRadius:"50%",
          background:"rgba(255, 255, 255, 0.06)",
          display:"flex",
        }}
      />
      <div
        style={{
          position:"absolute",
          bottom:"-80px",
          left:"-80px",
          width:"300px",
          height:"300px",
          borderRadius:"50%",
          background:"rgba(255, 255, 255, 0.04)",
          display:"flex",
        }}
      />
    </div>,
    {
      ...SIZE,
      headers: {"Cache-Control":"public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400",
      },
    },
  );
}
