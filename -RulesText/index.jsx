import React from "react";
import {BRANDS, getLang} from "../../../../common";
import {
  customRulesCurrencyList,
  customRulesCurrencyValues
} from "../assets/constants";

const RulesText = ({brandName, lang, landingName}) => {

  const {translation} = require(`../../../../translations/${landingName}/translation`);

  const currencyNamesList = customRulesCurrencyList[brandName];
  const currencyListLength = customRulesCurrencyList[brandName].length;

  const currencyNames = currencyNamesList.map(item => {
    return <td className="bold-font">{getLang(translation, brandName, lang, `tableCurrency${item}`)}</td>
  })

  const setCurrencyValuesInLine = (arrOfCurrencies, index) => {
    return arrOfCurrencies.map(item => {
      for (const key in customRulesCurrencyValues) {
        if (key === item) {
          return <td>{customRulesCurrencyValues[key][index]}</td>
        }
      }
    })
  }

  return (
    <>

      {Array.from({length: 4}).map((_, number) =>
        <h2 key={number}>
          {getLang(translation, brandName, lang, `paragraph${number + 1}`)}
        </h2>)}

      {Array.from({length: 2}).map((_, number) =>
        <p key={number}>
          {getLang(translation, brandName, lang, `subParagraph4${number + 1}`)}
        </p>
      )}
      {Array.from({length: 1}).map((_, number) =>
        <h2 key={number}>
          {getLang(translation, brandName, lang, `paragraph5`)}
        </h2>
      )}

      {Array.from({length: 1}).map((_, number) =>
        <h2 key={number}>
          {getLang(translation, brandName, lang, `paragraph6`)}
        </h2>
      )}
      {Array.from({length: 4}).map((_, number) =>
        <p key={number}>
          {getLang(translation, brandName, lang, `subParagraph6${number + 1}`)}
        </p>
      )}
      {Array.from({length: 1}).map((_, number) =>
        <h2 key={number}>
          {getLang(translation, brandName, lang, `paragraph7`)}
        </h2>
      )}
      {Array.from({length: 5}).map((_, number) =>
        <p key={number}>
          {getLang(translation, brandName, lang, `subParagraphLetter7${number + 1}`)}
        </p>
      )}
      {Array.from({length: 2}).map((_, number) =>
        <h2 key={number}>
          {getLang(translation, brandName, lang, `paragraph${7 + number + 1}`)}
        </h2>
      )}
      {Array.from({length: 8}).map((_, number) =>
        <p key={number}>
          {getLang(translation, brandName, lang, `subParagraph9${1 + number}`)}
        </p>
      )}
      {brandName === BRANDS.secret ?
        <>
        {Array.from({length: 3}).map((_, number) =>
          <h2 key={number}>
            {getLang(translation, brandName, lang, `paragraph${9 + number +1}`)}
          </h2>
        )}
        </>
        :
        <>
        {Array.from({length: 1}).map((_, number) =>
          <h2 key={number}>
            {getLang(translation, brandName, lang, `paragraph${9 + number +1}`)}
          </h2>
        )}
        </>
      }
      {brandName === BRANDS.secret ?
        ''
        :
        <>
          {Array.from({length: 8}).map((_, number) =>
            <p key={number}>
              {getLang(translation, brandName, lang, `subParagraph10${1 + number}`)}
            </p>
          )}
        </>
      }
      {brandName === BRANDS.secret ?
        ''
        :
        <>
          {Array.from({length: 2}).map((_, number) =>
            <h2 key={number}>
              {getLang(translation, brandName, lang, `paragraph${9 + number + 2}`)}
            </h2>
          )}
        </>
      }
      {Array.from({length: 5}).map((_, number) =>
        <p key={number}>
          {getLang(translation, brandName, lang, `subParagraph12${1 + number}`)}
        </p>
      )}
      {Array.from({length: 1}).map((_, number) =>
        <h2 key={number}>
          {getLang(translation, brandName, lang, `paragraph13`)}
        </h2>
      )}
      {Array.from({length: 5}).map((_, number) =>
        <p key={number}>
          {getLang(translation, brandName, lang, `subParagraph13${1 + number}`)}
        </p>
      )}
      {Array.from({length: 3}).map((_, number) =>
        <h2 key={number}>
          {getLang(translation, brandName, lang, `paragraph${9 + number + 5}`)}
        </h2>
      )}
      {brandName === BRANDS.secret ?
        <div className={`table-wrapper table-wrapper_${brandName}`}>
          <table className={`table table_${brandName}`}>
            <tr>
              <td rowSpan={brandName !== BRANDS.secret ? "2" : "1"} className="bold-font">{getLang(translation, brandName, lang, `tableLeftTopText`)}</td>
              <td className="bold-font" >{getLang(translation, brandName, lang, `tableCenterTopText`)}</td>
            </tr>
            {brandName !== BRANDS.secret &&
            <tr>

            </tr>
            }
            <tr>
              <td>{'500'}</td>
              <td></td>
            </tr>
            <tr className={`one one_${brandName}`}>
              <td>{'8'}</td>
              <td></td>
            </tr>
            <tr className={`one one_${brandName}`}>
              <td>{'8'}</td>
              <td></td>
            </tr>
            <tr className={`one one_${brandName}`}>
              <td>{'300'}</td>
              <td></td>
            </tr>
            <tr className={`one one_${brandName}`}>
              <td>{'3900'}</td>
              <td></td>
            </tr>
            <tr className={`one one_${brandName}`}>
              <td>{'130'}</td>
              <td></td>
            </tr>
            <tr className={`one one_${brandName}`}>
              <td>{'350000'}</td>
              <td></td>
            </tr>
            <tr className={`one one_${brandName}`}>
              <td>{'40'}</td>
              <td></td>
            </tr>
            <tr className={`one one_${brandName}`}>
              <td>{'30'}</td>
              <td></td>
            </tr>
            <tr className={`one one_${brandName}`}>
              <td>{'160'}</td>
              <td></td>
            </tr>

          </table>
        </div>
        :
        ''
      }

    </>
  )
}

export default RulesText;
