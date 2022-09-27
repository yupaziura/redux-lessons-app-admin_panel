
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useHttp } from "../../hooks/http.hook";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { heroesFetched } from '../../actions';


const HeroesFilters = () => {
    const {request} = useHttp();
    const {heroes} = useSelector(state => state);
    const dispatch = useDispatch();

    const [elementsData, setElementsData] = useState([]);

    const [test, setTest] = useState();



    useEffect(()=> {
        request('http://localhost:3001/filters')
            .then(data=> setElementsData(data))
            // eslint-disable-next-line
    }, []);


    const filterHeros = () => {
        
        request('http://localhost:3001/heroes')
            .then((data) => {
                dispatch(heroesFetched(data))
                return data
            })
            .then((data)=> {
                const next = data.filter(({element})=> {
                    if( test === 'all') {
                        return data
                    }
                    else{
                        return element === test
                    }
                })
                dispatch(heroesFetched(next));
            })
    }

    useEffect(()=> {
        filterHeros()
    }, [test])


    const buttons = elementsData.map(({name, value, classCSS}, i)=> {
                 return <button onClick={(e)=> setTest(e.target.value)} value={value} key={i} className={`btn ${classCSS}`} >{name}</button>
            })


    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {/* <button className="btn btn-outline-dark active">Все</button>
                    <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button> */}
                    {buttons}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;