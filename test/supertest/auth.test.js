import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";

const requester = supertest(`http://localhost:${process.env.PORT}/api`);

describe("TESTING: Rutas de Auth", () => {
    let cookies;
    let userId;
    let token;
    const admin = {
        email: "javier@javier.com",
        password: "securepassword"
    };

    it("POST /api/auth/register", async () => {
        const response = await requester.post("/auth/register").send(admin);
        expect(response.status).to.equal(201);
    });

    it("POST /api/auth/login tiene exito el inicio de sesión", async () => {
        const response = await requester.post("/auth/login").send(admin);
        const { status, headers, _body } = response;
        cookies = headers["set-cookie"];
        userId = _body.user_id;
        token = _body.token;
        expect(status).to.equal(200);
    });

    
});
