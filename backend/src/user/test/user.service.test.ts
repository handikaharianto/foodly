import { describe, it, before } from "mocha";
import { expect } from "chai";
import sinon from "sinon";
import { userModel } from "../user.model";
import UserService from "../user.service";

describe("User Service", () => {
  describe("createUser", () => {
    it("successful", async () => {
      const userModelStub = sinon.stub(userModel);

      userModelStub.findOne
        .withArgs({ email: "johndoe@gmail.com" })
        .resolves(null);

      userModelStub.create.resolves({
        _id: "asdf86sad98fs",
        fullName: "john doe",
        email: "johndoe@gmail.com",
        password: "johndoe123",
      });

      const createdUser = await new UserService().createUser({
        fullName: "john doe",
        email: "johndoe@gmail.com",
        password: "johndoe123",
      });
      expect(createdUser).to.be.deep.equal({
        _id: "asdf86sad98fs",
        fullName: "john doe",
        email: "johndoe@gmail.com",
        password: "johndoe123",
      });
    });
  });
});
