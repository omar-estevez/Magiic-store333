import { Container } from "../../commons/Container/Container"
import { Section } from "../../layout/Section/Section"
import { HeroActions } from "./HeroActions/HeroActions"
// import { ProductCard } from "./ProductCard/ProductCard"
import style from './Hero.module.css'
import videoHero from '../../../assets/videos/hero_video.mp4'
import videoHeroReverse from '../../../assets/videos/hero_video_reverse.mp4'

export const Hero = () => {
    return (
        <Section id="hero" bgVideo={videoHero} bgVideoReverse={videoHeroReverse}>
            <Container>
                <div className={style.subcontainer}>
                    <HeroActions />
                    {/* <ProductCard /> */}
                </div>
            </Container>
        </Section>
    )
}
