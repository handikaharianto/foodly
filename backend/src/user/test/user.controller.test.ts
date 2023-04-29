import { expect } from "chai";
import { Request, Response, NextFunction } from "express";
import { beforeEach, describe, it, before, afterEach } from "mocha";
import sinon, { SinonStub, SinonStubbedInstance } from "sinon";
import HTTP_STATUS from "../../common/http-status-code";
import UserController from "../user.controller";
import UserService from "../user.service";

describe("User Controller", () => {
  let userServiceStub: SinonStubbedInstance<UserService>;
  let userController: UserController;

  let res: {
    status: SinonStub;
    json: SinonStub;
  };
  let next: SinonStub;

  before(() => {
    userServiceStub = sinon.stub(new UserService());
    userController = new UserController(userServiceStub);
    next = sinon.stub();
  });

  beforeEach(() => {
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(() => {
    sinon.reset();
  });

  describe("POST /users/register", () => {
    it("should respond with 201 HTTP status code when new user is successfully created", async () => {
      userServiceStub.createUser.resolves({
        _id: "asdf86sad98fs",
        fullName: "john doe",
        email: "johndoe@gmail.com",
        password: "johndoe123",
      });

      const req = {
        body: {
          fullName: "john doe",
          email: "johndoe@gmail.com",
          password: "johndoe123",
        },
      };

      await userController.createUser(
        req as unknown as Request,
        res as unknown as Response,
        next as unknown as NextFunction
      );

      expect(res.status.calledOnce).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.status.calledWith(HTTP_STATUS.CREATED_201)).to.be.true;
      expect(
        res.json.calledWith({
          _id: "asdf86sad98fs",
          fullName: "john doe",
          email: "johndoe@gmail.com",
          password: "johndoe123",
        })
      ).to.be.true;
    });

    it("should respond with 409 HTTP status code when email has been registered", () => {});
  });

  describe("POST /users/login", () => {
    it("should respond with 200 HTTP status code when email and password are correct", () => {});

    it("should respond with 400 HTTP status code when email or password are missing or invalid", () => {});
  });
});
