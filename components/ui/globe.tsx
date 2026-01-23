"use client";
import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { cn } from "@/lib/utils";

export const World = ({
    globeConfig,
    data,
    className,
}: {
    globeConfig: any;
    data: any[];
    className?: string;
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef(null);
    const pointerInteractionMovement = useRef(0);
    const [r, setR] = useState(0);

    const _updatePointerInteraction = (clientX: any) => {
        if (pointerInteracting.current !== null) {
            const delta = clientX - (pointerInteracting.current as any);
            pointerInteractionMovement.current = delta;
            setR(delta / 200);
        }
    };

    const _onPointerDown = (e: any) => {
        pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
        if (canvasRef.current) (canvasRef.current as any).style.cursor = "grabbing";
    };

    const _onPointerUp = () => {
        pointerInteracting.current = null;
        if (canvasRef.current) (canvasRef.current as any).style.cursor = "grab";
    };

    const _onMouseMove = (e: any) => {
        if (pointerInteracting.current !== null) {
            _updatePointerInteraction(e.clientX);
        }
    };

    const _onTouchMove = (e: any) => {
        if (pointerInteracting.current !== null && e.touches[0]) {
            _updatePointerInteraction(e.touches[0].clientX);
        }
    };

    const updatePointerInteraction = (value: any) => {
        pointerInteractionMovement.current = value;
    };

    useEffect(() => {
        let globe: any;
        let phi = 0;
        let width = 0;

        const onResize = () => {
            if (canvasRef.current && (width = canvasRef.current.offsetWidth)) {
                window.addEventListener("resize", onResize);
            }
        }

        const initGlobe = () => {
            if (!canvasRef.current || globe) return;

            onResize();
            window.addEventListener("resize", onResize);

            globe = createGlobe(canvasRef.current, {
                devicePixelRatio: 1, // Reduced from 2 for performance
                width: width * 2,
                height: width * 2,
                phi: 0,
                theta: 0,
                dark: 1,
                diffuse: 1.2,
                mapSamples: 12000, // Reduced from 16000
                mapBrightness: 6,
                baseColor: [0.3, 0.3, 0.3],
                markerColor: [0.1, 0.8, 1],
                glowColor: [1, 1, 1],
                markers: globeConfig.markers || [],
                onRender: (state) => {
                    if (!pointerInteracting.current) {
                        phi += 0.003;
                    }
                    state.phi = phi + r;
                    state.width = width * 2;
                    state.height = width * 2;
                },
                ...globeConfig,
            });
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                initGlobe();
                // Optional: disconnect if we only want to load once and keep running
                // observer.disconnect(); 
            } else {
                // Optional: Destroy globe when out of view to save resources? 
                // For now, let's just init when visible to save initial load.
            }
        }, { threshold: 0.1 });

        if (canvasRef.current) {
            observer.observe(canvasRef.current);
        }

        return () => {
            if (globe) globe.destroy();
            window.removeEventListener("resize", onResize);
            observer.disconnect();
        };
    }, [globeConfig, r]);

    return (
        <div
            className={cn(
                "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
                className
            )}
        >
            <canvas
                className={cn(
                    "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
                )}
                ref={canvasRef}
                onPointerDown={(e) =>
                    updatePointerInteraction(
                        e.clientX - pointerInteractionMovement.current
                    )
                }
                onPointerUp={() => updatePointerInteraction(null)}
                onPointerOut={() => updatePointerInteraction(null)}
                onMouseMove={(e) => updatePointerInteraction(e.clientX)}
                onTouchMove={(e) =>
                    e.touches[0] && updatePointerInteraction(e.touches[0].clientX)
                }
                style={{
                    width: '100%',
                    height: '100%',
                    cursor: 'grab',
                    opacity: 1
                }}
            />
        </div>
    );
};
