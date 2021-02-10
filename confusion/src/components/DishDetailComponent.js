import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';

class Dish extends Component{
    constructor(props){
        super(props);

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
    render() {
        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dish)}
                </div>
            </div>
        );
    }
}

export default Dish;