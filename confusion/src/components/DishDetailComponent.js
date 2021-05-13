import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {BrowserRouter, Link} from 'react-router-dom';

    function RenderDish({dish}) {
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
            return(<div></div>);
        }
    }

    function RenderComments({comment}){    
        if(comment != null){
            const com = comment.map((cmt) => {
                return(
                    <div tag="li">
                        <p>{cmt.comment}</p>
                        <p>--{cmt.author}, { new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(cmt.date)))}</p> 
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
            return(<div></div>);
        }
    }

    const DishDetail = (props) => {
        return(
            <div className="container">  
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to = '/menu'> menu </Link></BreadcrumbItem>
                        <BreadcrumbItem active> {props.dish.name} </BreadcrumbItem>
                    </Breadcrumb>
                    <div className ="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish = {props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comment={props.comments}/>
                    </div>
                </div>
            </div> 
        );
    }
    
export default DishDetail;