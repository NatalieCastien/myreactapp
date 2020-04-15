import React, {useState} from "react";
import Card from "./Card";
// import Groceryform from "./Groceryform";
import GroceryListItem from "./GroceryListItem";
import GroceryInputField from "./GroceryInputField";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

function Grocerypage(props) {
    
    

    function createCard(item) {
        return (
          <Card
            key={item.idIngredient}
            identifier={item.idIngredient}
            name={item.strIngredient}
            img={item.img} 
            onChecked={addItem}       
          />
        );
      }

    const [name, setName] = useState("");
    const [grocerylistName, setGrocerylistName] = useState("Name grocerylist");
    var [countCal, setCountCal] = useState(0);
    const [groceryObject, setGroceryObject] = useState({name: "", count: 0})
    const [list, setList] = useState([{name: "", count: countCal}]);
    
    const [showHeader, setShowHeader] = useState("none");
    const [showHeaderForm, setShowHeaderForm] = useState("inline-block");
    const [showList, setShowList] = useState("none");

    function handleChange(event) {
        setName(event.target.value);
    }

    // Check whether product is already on the list
    function productExists(productname) {
      return list.some(function(item) {
        return item.name == productname;
      }); 
    }

    function getIndex(product) {
      return list.findIndex(obj => obj.name === product);
    }
    
    function addItem(productname) {
        console.log(productname);        
        const productOnList = productExists([productname]);
        console.log(productOnList);
        if (productOnList == false) {
        setList(prevItems => {
          setCountCal(1);
            return [{name: productname, count: countCal}, ...prevItems] ;     
            });                      
        } else {
            const index = getIndex(productname);
            const object = list[index];
            const objectCount = object.count;            
            const newCount = objectCount + 1;
            
            deleteItem(index);

            setList(prevItems => {
              return [{name: productname, count: newCount}, ...prevItems] ;     
              });    
        }   
    }
    
    function handleSubmit(event) {
        setGrocerylistName(name);
        setShowHeader("inline");
        setShowHeaderForm("none");
        setShowList("inline");
        event.preventDefault();
    }

      function onAdd(name, count) {
        count = +1;
        setList(prevItems => {
          return [{name: name, count: count}, ...prevItems] ;     
        });               
      }
    
      function deleteItem(id) {
        setList(prevItems => {
          return prevItems.filter(
            (item, index) => {
              return index !== id;
            }
          )
        })
      }


    return(
    <div>
        <Row>
            <Col className="col-md-3">
                <div className="grocerylist">
                <div className="container groceryNote">
                <div className="grocerylistheading" style={{display: showHeader}}>
                    <h1>{grocerylistName}</h1>
                </div>

                <form className="form" onSubmit={handleSubmit} style={{display: showHeaderForm}}>
                    <input 
                        type="text"
                        placeholder="the name of your grocerylist"
                        onChange={handleChange}
                        value={name}
                    />
                    <button type="submit">Save</button>
                </form>

                <div style={{display: showList}}>
                <GroceryInputField onAdd={onAdd} />     
                </div>

                <div>
                    <ul>
                    {list.map((listItem, index) => (
                        <GroceryListItem
                        id={index}
                        key={index}
                        item={listItem.name}
                        onChecked={deleteItem}
                        count={listItem.count}
                        />
                    ))}
                    </ul>
                </div> 
                </div>                    
                </div>
            </Col>

            <Col className="col-md-9">
                <div className="productlist">
                {props.items.map(createCard)}                                
                </div>
            </Col>   
        </Row>
    </div>
    )
}

export default Grocerypage;