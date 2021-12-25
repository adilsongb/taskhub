import '../styles/Calendar.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

function Calendar() {
  return (
    <div className="floatFull-container">
      <div className="calendar">
        <div className="month">
            <button><FaAngleLeft /></button>
            <h1>Dezembro</h1>
            <button><FaAngleRight /></button>
        </div>
        <div className="weekdays">
          <div>Dom</div>
          <div>Seg</div>
          <div>Ter</div>
          <div>Qua</div>
          <div>Qui</div>
          <div>Sex</div>
          <div>Sáb</div>
        </div>
        <div className="days">
          <div className="prev-date"><span>28</span></div>
          <div className="prev-date"><span>29</span></div>
          <div className="prev-date"><span>30</span></div>
          <div><span>1</span></div>
          <div><span>2</span></div>
          <div><span>3</span></div>
          <div><span>4</span></div>
          <div><span>5</span></div>
          <div><span>6</span></div>
          <div><span>7</span></div>
          <div><span>8</span></div>
          <div><span>9</span></div>
          <div><span>10</span></div>
          <div><span>11</span></div>
          <div><span>12</span></div>
          <div><span className="xp2">13</span></div>
          <div><span className="xp3">14</span></div>
          <div><span className="xp1">15</span></div>
          <div><span>16</span></div>
          <div><span>17</span></div>
          <div><span>18</span></div>
          <div><span className="xp1">19</span></div>
          <div><span className="xp2">20</span></div>
          <div><span>21</span></div>
          <div><span>22</span></div>
          <div><span>23</span></div>
          <div><span className="today">24</span></div>
          <div><span>25</span></div>
          <div><span>26</span></div>
          <div><span>27</span></div>
          <div><span>28</span></div>
          <div><span>29</span></div>
          <div><span>30</span></div>
          <div><span>31</span></div>
          <div className="next-date"><span>1</span></div>
          <div className="next-date"><span>2</span></div>
          <div className="next-date"><span>3</span></div>
          <div className="next-date"><span>4</span></div>
          <div className="next-date"><span>5</span></div>
          <div className="next-date"><span>6</span></div>
          <div className="next-date"><span>7</span></div>
          <div className="next-date"><span>8</span></div>
        </div>
      </div>
    </div>
  )
}

export default Calendar;
