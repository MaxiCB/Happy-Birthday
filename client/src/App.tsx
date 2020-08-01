import React from "react";
import "./App.css";
import axios from "axios";

import { Steps, Layout, Form, Input, Button, Col, Row, Modal } from "antd";
import { previewImage } from "antd/lib/upload/utils";

// Interface for all information a user will contain
interface Person {
  name: string;
  email: string;
  month: number;
  day: number;
  year: number;
}

const App: React.FC = () => {
  // Step counter for UI and logic
  const [step, setStep] = React.useState<number>(0);
  // Pointer to the person's information
  const [person, setPerson] = React.useState<Person>();
  // Boolean for showing the modal at the end
  const [modal, setModal] = React.useState<boolean>(false);
  const [infoArray, setInfoArray] = React.useState<Person[]>([]);

  // Destructuring out components from ANTD
  const { Step } = Steps;
  const { Content } = Layout;

  //Form Layout
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  // Logic to create the referenced bug
  // User choses yes
  // Set step counter to 0
  // Stop displaying modal
  // This is the bug as it allows the user
  // to over write the currently stored user information
  const bugAddAnother = () => {
    setStep(0);
    setModal(false);
  };
  // User choses yes
  // Submit the existing information
  // Set step to 0
  // Stop displaying modal
  // User can input next persons information
  // This also provides the benefit of using the same logic for
  // Handling a single entry and multiple entries
  // Any time the user is prompted with adding another user
  // The current information will always be sent
  const solutionOne = () => {
    submitPerson();
    setStep(0);
    setModal(false);
  };
  // User choses yes
  // Append information to infoArray;
  // Set step to 0
  // Stop displaying modal
  // User can input next persons information
  // When user finally selects no in last prompt
  // We can iterate over the array and sumbit information
  // This requires changing the submit logic
  // Also requires adding another variable
  const solutionTwo = () => {
    person && setInfoArray([...infoArray, person]);
    console.log(infoArray);
    setStep(0);
    setModal(false);
  };
  const solutionTwoSubmit = () => {
    infoArray &&
      infoArray.forEach((info) => {
        axios
          .post("http://localhost:5000/person", { person: info })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      });
    setStep(0);
    setModal(false);
  };
  // This logic can be combined with solutionTwo appending logic
  // User can input next persons information
  // When user finally selects no in last prompt
  // We can send the whole array to the API
  // This requires changing FE logic, adding another variable
  // While also requiring a change to the API
  // This is the least ideal solution
  // As it requires the most amount of work
  const solutionThreeSubmit = () => {
    axios
      .post("http://localhost:5000/multPeople", { multiplePerson: infoArray })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    setStep(0);
    setModal(false);
  };
  // API Call to send user information
  const submitPerson = () => {
    axios
      .post("http://localhost:5000/person", { person: person })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    setStep(0);
    setModal(false);
  };

  // Populating the fields of the person
  const updatePerson = (values: any) => {
    setPerson((prevState) => {
      return { ...prevState, ...values };
    });
    setStep(step + 1);
    // When last step is reached show modal
    // Asking user's if they'd like to add another person's info
    if (step >= 4) {
      setModal(true);
    }
  };

  return (
    <Layout>
      <Modal
        title=""
        visible={modal}
        footer={[
          <Button
            key="back"
            onClick={() => {
              // User choses no
              // Stop displaying the modal
              // Submit the user's information
              // Set the step counter back to 0
              solutionOne();
            }}
          >
            No
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              // User choses yes
              // Set step counter to 0
              // Stop displaying modal
              // This is the bug
              solutionOne();
            }}
          >
            Yes
          </Button>,
        ]}
      >
        <p>Would you like to add another person's birthday?</p>
      </Modal>
      <Content style={{ padding: "0 50px" }}>
        <Row style={{ padding: "24px" }}>
          <Col span={8}>
            <Steps direction="vertical" current={step}>
              <Step
                title="Name"
                description={step > 0 ? "Complete" : "Incomplete"}
              />
              <Step
                title="Email"
                description={step > 1 ? "Complete" : "Incomplete"}
              />
              <Step
                title="Birth Month"
                description={step > 2 ? "Complete" : "Incomplete"}
              />
              <Step
                title="Birth Day"
                description={step > 3 ? "Complete" : "Incomplete"}
              />
              <Step
                title="Birth Year"
                description={step > 4 ? "Complete" : "Incomplete"}
              />
            </Steps>
          </Col>
          <Col span={16}>
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={updatePerson}
            >
              {step === 0 && (
                <Form.Item
                  label="What is your name?"
                  name="name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              )}
              {step === 1 && (
                <Form.Item
                  label="What is your email?"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              )}
              {step === 2 && (
                <Form.Item
                  label="In what month were you born?"
                  name="month"
                  rules={[
                    {
                      required: true,
                      message: "Please input your birth month!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              )}
              {step === 3 && (
                <Form.Item
                  label={`What day in ${person ? person.month : "the month"}?`}
                  name="day"
                  rules={[
                    { required: true, message: `Please input your birth day!` },
                  ]}
                >
                  <Input />
                </Form.Item>
              )}
              {step === 4 && (
                <Form.Item
                  label="In what year were you born"
                  name="year"
                  rules={[
                    {
                      required: true,
                      message: "Please input your birth year!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              )}
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  {step > 4 ? "Submit" : "Next"}
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default App;
