import InputComponent from "./headerComponents/InputComponent"
import FaqQuestion from "./SectionsComponents/FaqQuestion"
import questionsList from "assets/questionsList"
function Faq()
{
    var Questions=questionsList.map((data)=>
        
        <FaqQuestion key={data.id} title={data.title}
        text1={data.text1} text2={data.text2}
        />
    )
    console.log(Questions)
    return(
        <div className="faq-container">
            <div className="faq-body">
                <div className="faq-title-container">
                    <h1>Frequently Asked Questions</h1>
                </div>
                <div className="faq-questions-container">
                    {Questions}
                </div>
                <InputComponent/>
            </div>
        </div>
    );
}
export default Faq