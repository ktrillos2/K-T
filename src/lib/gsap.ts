"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip, ScrambleTextPlugin, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
}

export const SCRAMBLE_CHARS = "01<>/{}[]#$%&*+=";
export const EASE_INOUT = "expo.inOut";

export { gsap, ScrollTrigger, SplitText, Flip, useGSAP };

/**
 * Windows marca "reducir movimiento" en Chrome cuando los efectos de animación del sistema están apagados
 * (muy común sin que la persona lo sepa). Las animaciones del sitio son suaves (fundidos y desplazamientos cortos),
 * así que se mantienen; solo el scroll suave, el cursor y la inclinación 3D respetan esa preferencia.
 */
export const prefersReducedMotion = () => false;
