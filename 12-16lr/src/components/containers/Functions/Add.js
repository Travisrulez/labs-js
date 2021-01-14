import React, {Component} from 'react';
import {Button, Col, Form} from "react-bootstrap";
import axios from 'axios';
import validator from 'validator';
import { withRouter } from "react-router-dom";

class Add extends Component {

    state = {
      name: '',
      surName: '',
      patronymic: '',
      phone: '',
      email: '',
      born: '',
      department: ''
    };

    changeName = event => {
        this.setState({name: event.target.value})
    };
    changeSurname = event => {
        this.setState({surName: event.target.value})
    };
    changePatronymic = event => {
        this.setState({patronymic: event.target.value})
    };
    changePhone = event => {
        const isValidPhoneNumber = validator.isMobilePhone(event.target.value);
        if (isValidPhoneNumber) {
            this.setState({phone: event.target.value})
        }
    };
    changeEmail = event => {
        const isValidEmail = validator.isEmail(event.target.value);
        if (isValidEmail) {
            this.setState({email: event.target.value})
        }
    };
    changeBorn = event => {
        this.setState({born: event.target.value})
    };
    changeDepartment = event => {
        this.setState({department: event.target.value})
    };

    addNewPerson = async () => {
        try {
            await axios.post('https://lr-10f95.firebaseio.com/persons.json', this.state);
        } catch (e) {
            console.log(e)
        }
        this.props.history.push("/");
    };

    render() {
        const isValidEmail = validator.isEmail(this.state.email);
        const isValidPhoneNumber = validator.isMobilePhone(this.state.phone);
        const validate = (
            (this.state.name === '')||
            (this.state.surName === '')||
            (this.state.patronymic === '')||
            (this.state.born === null)||
            (this.state.email === '')||
            (this.state.phone === null)||
            (this.state.department === '')||
            (!isValidPhoneNumber)||
            (!isValidEmail)
        );

        return (
            <div className={'Add'}>
                <div className="card">
                    <div className="card-header">
                        Добавить нового сотрудника
                    </div>
                    <div className="card-body">
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Имя</Form.Label>
                                    <Form.Control type="text" placeholder="Роман" onChange={this.changeName} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Фамилия</Form.Label>
                                    <Form.Control type="text" placeholder="Мазаев" onChange={this.changeSurname} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Отчество</Form.Label>
                                    <Form.Control type="text" placeholder="Романович" onChange={this.changePatronymic} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Телефон</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"
                                        placeholder="+7(___)___-__-__"
                                        onChange={this.changePhone}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="123@gmail.com" onChange={this.changeEmail} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Дата рождения</Form.Label>
                                    <Form.Control type="date" placeholder="Дата рождения" onChange={this.changeBorn} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Отдел</Form.Label>
                                    <Form.Control as="select" onChange={this.changeDepartment}>
                                        <option>IT</option>
                                        <option>Продажи</option>
                                        <option>Доставка</option>
                                        <option>Юридический</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            {!validate ?
                                <div className="edit-buttons">
                                    <Button variant={'primary'} onClick={this.addNewPerson}>Добавить нового сотрудника</Button>
                                </div> :
                                <div className="edit-buttons">
                                    <Button variant={'primary'} onClick={this.addNewPerson} disabled>Добавить нового сотрудника</Button>
                                </div>
                            }
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Add);