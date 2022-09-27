import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import { useHttp } from '../../hooks/http.hook';

import { heroesFetched, heroesFetchingError } from '../../actions';


// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const [name, setName] = useState('');
    const [descr, setDescr] = useState('');
    const [element, setElement] = useState();

    const {request} = useHttp();


    useEffect(()=> {
        console.log(element)

    }, [element])



    const {heroes} = useSelector(state => state);
    const dispatch = useDispatch();

    const addNewHero = (e, name, descr) => {
        e.preventDefault();
        
        const newId = uuidv4();
        const newHero = ({
            "id": newId,
            "name": name,
            "description": descr,
            "element": element
        })

        request(`http://localhost:3001/heroes/`, "POST", JSON.stringify(newHero))
        .then(()=> dispatch(heroesFetched([...heroes, newHero])))
        .catch(()=> dispatch(heroesFetchingError()))

        setName('');
        setDescr('');
        setElement();
    }


    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    onInput={(e)=>setName(e.target.value)}
                    value={name}
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    onInput={(e)=>setDescr(e.target.value)}
                    value={descr}
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    onChange={(e)=>setElement(e.target.value)}
                    value={element}
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button onClick={(e)=>{addNewHero(e, name, descr)}} type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;