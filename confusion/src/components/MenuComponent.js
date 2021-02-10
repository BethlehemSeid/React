import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';
import Dish from './DishDetailComponent';

class Menu extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedDish: null
        }
    }

    onDishSelect(dish) {
        this.setState({selectedDish: dish});
    }

    renderDish(dish) {
        if(dish != null){
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else{
            <div></div>
        }
    }
    renderComments(dish){
        
        if(dish != null){
            const com = dish.comments.map((cmt) => {
                return(
                    <div tag="li">
                        <p>{cmt.comment}</p>
                        <p>--{cmt.author}, {cmt.date}</p> 
                    </div>
                );
            });
            return(
                <>
                <h1>Comments</h1>
                <div list>{com}</div>
                </>
            );
        }
        else{
            <div></div>
        }
    }

    render(){
        const menu = this.props.dishes.map((dish) => {
            return(
                <div Key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onDishSelect(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        return(
            <div className="container">
                <div className='row'>
                    {menu}
                </div>
                <Dish dish= {this.state.selectedDish} />
            </div>
        );
    }
} 

export default Menu;

