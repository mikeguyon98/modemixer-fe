import { animate, useMotionValue, motion } from "framer-motion";
import Card from "../components/Card";
import useMeasure from "react-use-measure";
import { useEffect, useState } from "react";


export default function ExploreCollections() {
    const images = [
        "western.png",
        "wildwest.png",
        "artdeco.png",
        "1960retro.png",
        "1990retro.png",
        "aimeleon.png",
        "kapital.png",

    ];

    const FAST_DURATION = 25;
    const SLOW_DURATION = 99;

    const [duration, setDuration] = useState(FAST_DURATION);

    let [ref, {width}] = useMeasure();

    const xTranslation = useMotionValue(0);

    const [mustFinish, setMustFinish] = useState(false);
    const [rerender, setRerender] = useState(false);


    useEffect(() => {
        let controls;
        let finalPosition = -width/2 -8;

        if (mustFinish) {
            controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
                ease: "linear",
                duration: duration * (1 - xTranslation.get() / finalPosition),
                onComplete: () => {
                    setMustFinish(false);
                    setRerender(!rerender);
                },
            })
        } else {
            controls = animate(xTranslation, [0, finalPosition],{
                ease: "linear",
                duration: duration,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0,
            });
        }

        return controls?.stop;
    }, [xTranslation, width, duration, rerender]);

    return ( 
        <main className="py-8">
            <motion.div className="absolute left-0 flex gap-4" ref={ref} 
                style={{x: xTranslation}}
                onHoverStart={()=>{
                    setMustFinish(true);
                    setDuration(SLOW_DURATION);
                }}
                onHoverEnd={()=>{
                    setMustFinish(true);
                    setDuration(FAST_DURATION);
                }}
            >
                {[...images, ...images].map((item, idx) => (
                    <Card image={item} key={idx}/>
                ))}
            </motion.div>
        </main>
    );
}