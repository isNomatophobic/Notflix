function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

export const slider = async (e,width,setSlidePosition,hasSlided,setHasSlided,moviesContainer,sectionMovies,setSectionMovies)=>{
    var newSection = []
    moviesContainer.current.style.transition="all 0.3s ease-out"
    
    if(e.target.classList.contains("section-ArrowRight"))
    {
        if(width<1100)
        {
        if(!hasSlided)setSlidePosition(-92)
        if(hasSlided)setSlidePosition(-114.8)
        }
        if(width>=1100)
        {
            if(!hasSlided)setSlidePosition(-92)
            if(hasSlided)setSlidePosition(-107.4)
        }
        if(width<=600)
        {
            if(!hasSlided)setSlidePosition(-92)
            if(hasSlided)setSlidePosition(-137.5)
        }
        newSection = sectionMovies.map((movie)=>movie)
        if(width>=1100)for(let i=0;i<6;i++)
        {
            if(i<=4&&!hasSlided)
            {
            newSection.push(newSection.shift())
            console.log();
            }
            if(i<=5&&hasSlided)
            {
                newSection.push(newSection.shift())

            }


        }
        else if(width>600)for(let i=0;i<4;i++)
        {
            if(i<=2&&!hasSlided)
            {
            newSection.push(newSection.shift())
            console.log();
            }
            if(i<=3&&hasSlided)
            {
                newSection.push(newSection.shift())

            }


        }
        else for(let i=0;i<2;i++)
        {
            if(i<=0&&!hasSlided)
            {
            newSection.push(newSection.shift())
            console.log();
            }
            if(i<=1&&hasSlided)
            {
                newSection.push(newSection.shift())

            }

        }
        

        console.log(newSection);
        await sleep(300)
        moviesContainer.current.style.transition="none"

        if(width<1100)setSlidePosition(-23)
        if(width<=600)setSlidePosition(-45.5)
        if(width>=1100)setSlidePosition(-15.4)

        setSectionMovies(newSection)
    }
    else if(e.target.classList.contains("section-ArrowLeft"))
    {                
        newSection = sectionMovies.map((movie)=>movie)
        if(width<1100&&width>600)for(let i=0;i<4;i++)
        {
            newSection.unshift(newSection[newSection.length-1])
            newSection.pop()

        }
        
        if(width>=1100)for(let i=0;i<6;i++)
        {
            newSection.unshift(newSection[newSection.length-1])
            newSection.pop()

        }
        if(width<=600)for(let i=0;i<2;i++)
        {
            newSection.unshift(newSection[newSection.length-1])
            newSection.pop()

        }
        setSectionMovies(newSection)
        moviesContainer.current.style.transition="none"
        if(width<1100)setSlidePosition(-114.8)
        if(width<=600)setSlidePosition(-137.5)
        if(width>=1100)setSlidePosition(-107.3)
        await sleep(10)
        moviesContainer.current.style.transition="all 0.3s ease-out"

        if(width<1100)setSlidePosition(-23.2)
        if(width<=600)setSlidePosition(-45.5)
        if(width>=1100)setSlidePosition(-15.3)

    }
    setHasSlided(true)

}