"use client"

import { m as motion } from "framer-motion"

export function AnimatedHeart() {
    return (
        <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "easeInOut" }}
            className="inline-block"
        >
            ❤️
        </motion.span>
    )
}
