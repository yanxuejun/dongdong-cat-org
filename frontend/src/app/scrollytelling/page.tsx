"use client";

import { useEffect } from "react";
import { HTML_BASE64 } from "./html";

function b64ToUtf8(base64: string): string {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder("utf-8").decode(bytes);
}

export default function ScrollytellingPage() {
  useEffect(() => {
    const html = b64ToUtf8(HTML_BASE64);
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Replace head content
    document.head.innerHTML = "";
    Array.from(doc.head.childNodes).forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as Element;
        const clone = document.createElement(el.tagName);
        Array.from(el.attributes).forEach((attr) => {
          clone.setAttribute(attr.name, attr.value);
        });
        clone.innerHTML = el.innerHTML;
        document.head.appendChild(clone);
      } else if (node.nodeType === Node.TEXT_NODE) {
        document.head.appendChild(document.createTextNode(node.textContent || ""));
      }
    });

    // Replace body content
    document.body.innerHTML = "";
    Array.from(doc.body.childNodes).forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as Element;
        const clone = document.createElement(el.tagName);
        Array.from(el.attributes).forEach((attr) => {
          clone.setAttribute(attr.name, attr.value);
        });
        clone.innerHTML = el.innerHTML;
        document.body.appendChild(clone);
      } else if (node.nodeType === Node.TEXT_NODE) {
        document.body.appendChild(document.createTextNode(node.textContent || ""));
      }
    });

    // Re-execute inline scripts
    document.body.querySelectorAll("script").forEach((oldScript) => {
      const newScript = document.createElement("script");
      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else {
        newScript.textContent = oldScript.textContent;
      }
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, []);

  return <div style={{ display: "none" }} />;
}
