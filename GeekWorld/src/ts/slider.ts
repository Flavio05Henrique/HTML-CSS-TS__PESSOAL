let slider : HTMLDivElement
let sliderItens : NodeListOf<HTMLDivElement>
let sliderbuttons : HTMLButtonElement

const startSlider = () => {
    slider = document.querySelector('[data="slider"]') as HTMLDivElement
    sliderItens = slider.querySelectorAll('[data="secReviews__card"]') as NodeListOf<HTMLDivElement>
    sliderbuttons = slider.querySelector('[data="sliderBnts"]') as HTMLButtonElement
}

export default startSlider;