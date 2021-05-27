import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Col, Row, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import {LocalForm, Errors, Control} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModalCommentOpen: false
        };
        this.toggleCommentModal = this.toggleCommentModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleCommentModal(){
        this.setState({
            isModalCommentOpen: !this.state.isModalCommentOpen
        });
    }
    

    handleSubmit(values){
        
        this.toggleCommentModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        return(
            <>
                <Button outline onClick={this.toggleCommentModal.bind(this)}> <span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen = {this.state.isModalCommentOpen} toggle={this.toggleCommentModal}>
                    <ModalHeader toggle = {this.toggleCommentModal}><strong>Submit Comment</strong></ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className = "form-group">
                            <Label htmlFor= "rating" md={12}><strong>Rating</strong></Label>
                            <Col md={12}>
                                <Control.select model = ".rating" name = "rating" className = "form-control" >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className = "form-group">
                            <Label htmlFor = "author" md = {12}><strong>Your Name</strong></Label>
                            <Col md={12}>
                                <Control.text model = ".author" id="author" name="author" placeholder = "User Name" className = "form-control" validators= {{required, minLength: minLength(3), maxLength: maxLength(15)}} />
                                <Errors className = "text-danger" model=".author" show="touched" messages={{required: 'Required', minLength: 'Must be greater than 2 characters', maxLength: 'Must be 15 characters or less'}} />
                            </Col>
                        </Row>
                        <Row className = "form-group">
                            <Label htmlFor = "comment" md = {12}> <strong>Comment</strong></Label>
                            <Col md = {12}>
                                <Control.textarea model=".comment" id = "comment" name = "comment" rows="6" className="form-control"/>
                            </Col>
                        </Row>
                        <Row className = "form-group">
                            <Col md = {{size:12}}>
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );

    }
        
    
}



function DishDetail (props){
    if(props.isLoading){
        return(
            <div className = "container">
                <div className = "row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess){
        return(
            <div className = "container">
                <div className = "row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );      
    }
    else
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
                        <RenderComments comment={props.comments} 
                            postComment = {props.postComment}
                            dishId={props.dish.id}/>
                    </div>
                </div>
            </div> 
        );
}


function RenderDish({dish}) {
    if(dish != null){
        return(
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
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

function RenderComments({comment, postComment, dishId}){    
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
                <CommentModal dishId = {dishId} postComment = {postComment} />
            </>
        );
    }
    else{
        return(<div></div>);
    }
}



export default DishDetail;




 
