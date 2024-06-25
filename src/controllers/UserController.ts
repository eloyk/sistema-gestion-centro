import { Request, Response } from 'express';
import { getToken } from '../services/keycloak';

export default class UserController {

  public async login(req: Request, res: Response) {
    try {
      const { username, password, code } = req.body;
      const usuarioJwt = await getToken(username, password, code);

      res.status(200).send({ Authorization: usuarioJwt.access_token });
    } catch (e) {
      return res.status(400).send({ mesage: `${e}` });
    }
  }

  public async logout(req: Request, res: Response) {
    req.session = null;
    res.send({});
  }

  public async currentUser(req: Request, res: Response) {
    res.send({ currentUser: req.currentUser || null });
  }
}