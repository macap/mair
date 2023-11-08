import { format, add, setHours, setMinutes, isEqual } from "date-fns"
import cx from "classnames"
import css from './FlightForm.module.scss'

function FlightForm({ arrivalDate, currentDate, dayOffset, setDayOffset, currentOrigin, setOrigin }) {

    const visibleOffset = dayOffset < 4 ? [1,2,3] : [dayOffset -1, dayOffset, dayOffset +1, dayOffset+2]
    const displayDates = visibleOffset.map(inc =>  setHours(
        setMinutes(add(arrivalDate, { days: inc}), 0),0))

    return <div className={css.flightform}>
       <div className={css.airportForm}>
        <svg viewBox="0 0 19 13" xmlns="http://www.w3.org/2000/svg" height="24px" width="24px"><path d="M17.737 1.076c-1.21-.656-2.586-.308-3.526.1l-2.804 1.217L6.585.136 3.714.251l3.981 3.757-2.537 1.121-2.64-.935-1.768.767 1.597 1.846c-.168.188-.321.451-.182.728.18.362.717.545 1.596.545.18 0 .375-.008.584-.023.965-.071 2.012-.3 2.666-.584l10.022-4.35c.865-.375 1.296-.77 1.318-1.205.01-.226-.087-.556-.614-.842zM.75 11.533h17.602v.662H.75z"></path></svg>
        <span className={css.airportName}>{currentOrigin.name} ({currentOrigin.iataCode}), {currentOrigin.countryName}</span>
       </div>
       <div className={css.dateForm}>
       <button
          disabled={dayOffset === 0}
          onClick={() => setDayOffset((d) => d - 1)}
          title="Shorten your stay here by 1 day"
          className={css.button}
        >
            ◀︎
          
        </button>
        {dayOffset<4 && (<div className={cx(css.dateItem, { [css.dateItemActive]: dayOffset === 0})}>
            <div className={css.dateDiff}>arrival day</div>
            <div className={css.date}>{format(arrivalDate, "dd MMM")}</div>
            <div className={css.day}>{format(arrivalDate, "EEEE")}</div>
            <div className={css.time}>{format(arrivalDate, "HH:mm")}</div>
        </div>)}
        
        {displayDates.map((date, i) => (
            <div className={cx(css.dateItem, { [css.dateItemActive]: isEqual(date, currentDate)})}>
                <div className={css.dateDiff}>+ {visibleOffset[i]} days</div>
                <div className={css.date}>{format(date, "dd MMM")}</div>
                <div className={css.day}>{format(date, "EEEE")}</div>
                <div className={css.time}>{format(date, "HH:mm")}</div>
            </div>
        ))}
    
        <button onClick={() => setDayOffset((d) => d + 1)} title="Stay here for 1 more day " className={css.button}>
          ▶︎
        </button>
       </div>
      <div>
        
        
      </div>
    </div>
}

export default FlightForm;