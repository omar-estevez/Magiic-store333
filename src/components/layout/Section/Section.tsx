import type { SectionProps } from "./Section.type";
import style from './Section.module.css';
import { motion } from "framer-motion";
import clsx from "clsx";
import { useState } from "react";

export const Section = ({ children, id, bgVideo, bgVideoReverse }: SectionProps) => {

    const [reverse, setReverse] = useState(false);
    // const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <motion.section
            id={id}
            className={clsx(style.section__container, (id === 'hero' && style.section__hero))}
            style={{
                ...(id === 'hero' && { minHeight: '100vh' }),
                ...((id === 'popular' || id === 'newsletter') && { background: 'color-mix(in srgb, #1a1a1a 100%, transparent)' })
            }}

            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
        >

            {bgVideo && (
                <div style={{ position: 'fixed', zIndex: '-1', inset: '0' }}>
                    <video
                        key={reverse ? "reverse" : "forward"}
                        className={style.hero__video}
                        src={reverse ? bgVideoReverse : bgVideo}
                        muted
                        autoPlay
                        playsInline
                        onEnded={() => setReverse(prev => !prev)}
                    />
                </div>
            )}

            {children}
        </motion.section>
    )
}
