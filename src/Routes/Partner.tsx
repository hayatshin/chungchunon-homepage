import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import colors from "../colors";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ReactHelmet from "../components/ReactHelmet";
import { generateMedia } from "styled-media-query";

const customoMedia = generateMedia({
  cellphone: "500px",
});

const PartnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 100px;

  ${customoMedia.lessThan("cellphone")`
  padding-top: 50px;
  padding-bottom: 50px;
  `}
`;

const FormBox = styled.form`
  width: 60%;
  display: flex;
  flex-direction: column;
`;

const EachFormBox = styled.div`
  width: 100%;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.span`
  font-size: 15px;
  font-weight: 400;
  color: ${colors.boldGray};
  margin-bottom: 20px;
`;

const FormInput = styled.input`
  width: 40%;
  font-size: 17px;
  font-weight: 400;
  color: ${colors.boldGray};
  padding: 10px;
  border: none;
  outline: none;
  border-bottom: 1px solid ${colors.lightGray};
  &:focus {
    border-bottom: 1px solid ${colors.mainColor};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
`;

const PhoneInputBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PhoneInput = styled.input`
  display: flex;
  text-align: center;
  width: 10%;
  font-size: 17px;
  font-weight: 400;
  color: ${colors.boldGray};
  padding: 10px;
  border: none;
  outline: none;
  border-bottom: 1px solid ${colors.lightGray};
  &:focus {
    border-bottom: 1px solid ${colors.mainColor};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
`;

const ContentInput = styled.textarea`
  width: 80%;
  height: 300px;
  border: 1px solid ${colors.lightGray};
  padding: 30px;
  outline: none;
  border-radius: 20px;
  resize: none;
  font-size: 20px;
  &:focus {
    border: 1px solid ${colors.mainColor};
  }
`;

const AgreeContent = styled.div`
  overflow: auto;
  height: 50px;
  padding: 20px;
  margin-bottom: 50px;
`;

const AgreeText = styled.p`
  font-size: 14px;
  color: black;
  font-weight: 300;
  line-height: 30px;
`;

const AgreeLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 400;
  color: ${colors.boldGray};
  margin-bottom: 15px;
`;

const AgreeCheck = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 20px;
`;

const SubmitBtn = styled.input`
  width: 100px;
  height: 40px;
  font-size: 18px;
  font-weight: 600;
  background-color: white;
  border: 1px solid ${colors.mainColor};
  border-radius: 5px;
  align-self: center;
  margin-top: 50px;
  margin-bottom: 50px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.mainColor};
    color: white;
  }
`;

const ErrorBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const ErrorMessage = styled.span`
  margin-left: 50px;
  font-size: 15px;
  color: ${colors.mainColor};
  font-weight: 400;
`;

interface FormValue {
  name: string;
  email: string;
  phone_one: number;
  phone_two: number;
  phone_three: number;
  message: string;
  agree: boolean;
}

function Partner() {
  const navigate = useNavigate();
  const [mailError, setMailError] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: any) => {
    if (form && form.current) {
      emailjs
        .sendForm(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          form.current,
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        )
        .then(
          (result) => {
            if (result.text === "OK") {
              navigate("/mail");
            }
          },
          (error) => {
            setMailError(error.text);
          }
        );
    }
  };

  const onValid = (data: any) => {
    sendEmail(data);
  };

  return (
    <>
      <ReactHelmet title="?????? ??????" />
      <PartnerWrapper>
        <FormBox ref={form} onSubmit={handleSubmit(onValid)}>
          <EachFormBox>
            <ErrorMessage>{mailError !== null ? mailError : null}</ErrorMessage>
            <ErrorBox>
              <FormLabel>??????</FormLabel>
              {errors?.name?.message ? (
                <ErrorMessage>* {errors?.name?.message}</ErrorMessage>
              ) : null}
            </ErrorBox>
            <FormInput
              {...register("name", { required: "????????? ??????????????????." })}
              type="text"
              name="name"
            />
          </EachFormBox>
          <EachFormBox>
            <ErrorBox>
              <FormLabel>?????????</FormLabel>
              {errors?.email?.message ? (
                <ErrorMessage>* {errors?.email?.message}</ErrorMessage>
              ) : null}
            </ErrorBox>
            <FormInput
              {...register("email", {
                required: "???????????? ??????????????????.",
                pattern:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              })}
              type="email"
              name="email"
            />
          </EachFormBox>
          <EachFormBox>
            <ErrorBox>
              <FormLabel>?????? ????????? ?????????(????????????)</FormLabel>
              {errors?.phone_one?.message ||
              errors?.phone_two?.message ||
              errors?.phone_three?.message ? (
                <ErrorMessage>
                  *
                  {errors?.phone_one?.message ||
                    errors?.phone_two?.message ||
                    errors?.phone_three?.message}
                </ErrorMessage>
              ) : null}
            </ErrorBox>
            <PhoneInputBox>
              <PhoneInput
                {...register("phone_one")}
                type="text"
                name="phone_one"
              />
              <div style={{ width: 10 }}></div>
              <FormLabel>-</FormLabel>
              <div style={{ width: 10 }}></div>
              <PhoneInput
                {...register("phone_two")}
                type="text"
                name="phone_two"
              />
              <div style={{ width: 10 }}></div>
              <FormLabel>-</FormLabel>
              <div style={{ width: 10 }}></div>
              <PhoneInput
                {...register("phone_three")}
                type="text"
                name="phone_three"
              />
            </PhoneInputBox>
          </EachFormBox>
          <EachFormBox>
            <ErrorBox>
              <FormLabel>??????</FormLabel>
              {errors?.message?.message ? (
                <ErrorMessage>* {errors?.message?.message}</ErrorMessage>
              ) : null}
            </ErrorBox>
            <ContentInput
              {...register("message", {
                required: "?????? ????????? ??????????????????.",
              })}
              name="message"
            />
          </EachFormBox>
          <EachFormBox>
            <ErrorBox>
              <FormLabel>???????????? ?????? ??? ?????? ??????</FormLabel>
              {errors?.agree?.message ? (
                <ErrorMessage>* {errors?.agree?.message}</ErrorMessage>
              ) : null}
            </ErrorBox>
            <AgreeContent>
              <AgreeText>(??????)???????????? ??????, ????????? ?????? ??????</AgreeText>
              <AgreeText>
                ?????????(???)??? ????????? ????????? ???????????? ?????? ????????? ?????? ???????????????
                ?????? ??? ????????????, ???????????? ?????? ????????? ???????????? ???????????????
                ????????? ????????? ????????????.
              </AgreeText>
              <AgreeText>????????????: ??????, ????????? ??????</AgreeText>
            </AgreeContent>
            <AgreeLabel>
              <AgreeCheck
                {...register("agree", {
                  required: "?????? ?????? ?????? ??? ?????? ????????? ????????????.",
                })}
                type="checkbox"
                id="agree"
                name="agree"
              />
              ???????????? ?????? ??? ????????? ???????????????.
            </AgreeLabel>
          </EachFormBox>
          <SubmitBtn type="submit" value="?????????" />
        </FormBox>
      </PartnerWrapper>
    </>
  );
}

export default Partner;
