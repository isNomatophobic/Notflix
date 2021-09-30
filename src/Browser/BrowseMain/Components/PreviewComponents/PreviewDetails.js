import React from 'react'

export default function PreviewDetails({details,currentHovered,isHovered,isDetailed}) {
    return (
        <div style={{visibility:isHovered||isDetailed?"visible":"hidden"}}>
            <div className="HiddenContainer-Info">
                <span className="Info-VoteAverage">{`${details.vote*10}% Match`}</span>
                <span className="Info-AgeRating">{details.adult?"18+":"13+"}</span>
                <span className="Info-Runtime">{`${details.runtime}`}</span>
            </div>
            <div className="HiddenContainer-Genres">
                {details.genres.map((item)=><span className="Genres-Item">{item}</span>)}
            </div>
      </div>
    )
}
