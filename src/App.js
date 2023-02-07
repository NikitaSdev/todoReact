import React, {useEffect, useState} from 'react';
import Draggable from 'react-draggable'
import s from "./App.module.css"
import{ v4 } from 'uuid'
import {randomColor} from 'randomcolor'


const App = () => {
  const [item,  setItem] = useState('')
  const [items,setItems] = useState(
      JSON.parse(localStorage.getItem('items')) || []
  )
  useEffect(()=>{
    localStorage.setItem('items',JSON.stringify(items))
  },[items])

  const newItem = () => {
    if(item.trim() !== ''){
      const newItem = {
        id:v4(),
        item,
        color:randomColor({
          luminosity:'light'
        }),
        defaultPos:{
          x:100,
          y:-500
        }
      }
      setItems((items) => [...items,newItem])
      setItem('')
    }else{
       alert('Enter something')
    }
  }

  const deleteNode = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }
  const updatePos = (data,index) =>{
    let newItems = [...items]
    newItems[index].defaultPos = {x:data.x, y:data.y}
    setItems(newItems)
  }
  const keyPress = (e) => {
    const code = e.keyCode || e.which
    if(code === 13){
      newItem()
    }
  }
  return (
      <div className={s.app}>
        <div className={s.wrapper}>
          <input
              value={item}
              type="text"
              placeholder={"Enter something..."}
              onChange={(e) => setItem(e.target.value)}
              onKeyPress={(e) => keyPress(e)}
          />
          <button className={s.enter} onClick={newItem}>ENTER</button>
        </div>
        {
          items.map((item, index) => {
            return(
                <Draggable
                  key={index}
                  defaultPosition = {item.defaultPos}
                  onStop={(e,data) => {
                    updatePos(data,index)
                }}
                >
                  <div className={s.todoItem} style={{backgroundColor:item.color}}>
                    {item.item}
                    <button
                        className={s.delete}
                        onClick={() => deleteNode(item.id)}
                    >
                      X
                    </button>
                  </div>
                </Draggable>
            )
          })
        }
      </div>
  );
};

export default App;