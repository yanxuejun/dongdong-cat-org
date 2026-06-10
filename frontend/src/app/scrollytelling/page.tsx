"use client";

import { useEffect } from "react";
import { HTML_BASE64 } from "./html";

export default function ScrollytellingPage() {
  useEffect(() => {
    const html = atob(HTML_BASE64);
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // 替换 head 内容（保留 charset 和 viewport）
    const keep = new Set(["META", "TITLE", "BASE"]);
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

    // 替换 body 内容
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

    // 重新执行 inline scripts
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
