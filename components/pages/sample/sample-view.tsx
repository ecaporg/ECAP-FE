'use client';

import { useEffect, useRef } from 'react';

export const SampleView = ({ html }: { html: string }) => {
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!asideRef.current) {
      return;
    }

    const shadowHost = asideRef.current;
    let shadowRootInstance = shadowHost.shadowRoot;

    if (!shadowRootInstance) {
      shadowRootInstance = shadowHost.attachShadow({ mode: 'open' });
    } else {
      shadowRootInstance.innerHTML = '';
    }

    if (!shadowRootInstance) {
      console.error('Failed to create or access shadow DOM.');
      return;
    }
    const currentShadowRoot = shadowRootInstance;

    const doc = new DOMParser().parseFromString(html, 'text/html');

    const inlineStyleElements = Array.from(doc.querySelectorAll('style'));
    inlineStyleElements.forEach((styleEl) => {
      const newStyleTag = document.createElement('style');
      newStyleTag.innerHTML = styleEl.innerHTML;
      currentShadowRoot.appendChild(newStyleTag);
    });

    const linkElements = Array.from(
      doc.querySelectorAll('link[rel="stylesheet"]')
    ) as HTMLLinkElement[];
    linkElements.forEach((linkEl) => {
      const newLinkTag = document.createElement('link');
      newLinkTag.rel = 'stylesheet';
      newLinkTag.href = linkEl.href;
      if (linkEl.media) {
        newLinkTag.media = linkEl.media;
      }
      if (linkEl.integrity) {
        newLinkTag.integrity = linkEl.integrity;
      }
      if (linkEl.crossOrigin) {
        newLinkTag.crossOrigin = linkEl.crossOrigin;
      }
      currentShadowRoot.appendChild(newLinkTag);
    });

    const wrapperElement = doc.getElementById('content-wrapper');
    if (wrapperElement) {
      const contentContainer = document.createElement('div');
      contentContainer.innerHTML = wrapperElement.innerHTML;
      currentShadowRoot.appendChild(contentContainer);
    }
  }, [html]);

  return <aside ref={asideRef} />;
};
