import { popularsection } from "../../../data/Popular"
import { Container } from "../../commons/Container/Container"
import { Section } from "../../layout/Section/Section"
import { GridProducts } from "./GridProducts/GridProducts"

export const Popular = () => {
    return (
        <Section id="popular">
            <Container>
                <div>
                    <h2>{popularsection.title}</h2>
                    <GridProducts />
                </div>
            </Container>
        </Section>
    )
}
