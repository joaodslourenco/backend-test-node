import { Request, Response } from "express";
import { EstabelecimentoRepository } from "../repositories/estabelecimentoRepository";

class EstabelecimentoController {
  public async listEstabelecimentos(req: Request, res: Response) {
    try {
      const establishmentList =
        await EstabelecimentoRepository.getEstabelecimentosList();
      return res.status(200).json(establishmentList);
    } catch (err) {
      return res
        .status(400)
        .send({ message: `${err} - Erro ao carregar estabelecimentos.` });
    }
  }

  public async listEstabelecimentoById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const establishment =
        await EstabelecimentoRepository.getEstabelecimentoById(id);
      return res.status(200).send(establishment);
    } catch (err) {
      return res
        .status(400)
        .send({ message: `${err} - erro ao pesquisar estabelecimento.` });
    }
  }

  public async addEstabelecimento(req: Request, res: Response) {
    try {
      const estabelecimento = req.body;
      await EstabelecimentoRepository.addEstabelecimento(estabelecimento);
      return res.status(201).send({ establishment: estabelecimento });
    } catch (err) {
      return res
        .status(401)
        .send({ message: `${err} - falha ao registrar estabelecimento.` });
    }
  }

  public async updateEstabelecimento(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await EstabelecimentoRepository.getEstabelecimentoByIdAndUpdate(id, {
        $set: req.body,
      });
      return res.status(200).send("Estabelecimento atualizado com sucesso.");
    } catch (err) {
      return res
        .status(401)
        .send({ message: `${err} - falha ao atualizar estabelecimento.` });
    }
  }

  public async deleteEstabelecimento(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await EstabelecimentoRepository.getEstabelecimentoByIdAndDelete(id);
      return res
        .status(200)
        .send({ message: "Estabelecimento deletado com sucesso." });
    } catch (err) {
      return res
        .status(500)
        .send({ message: `${err} - falha ao deletar estabelecimento.` });
    }
  }
}

export default new EstabelecimentoController();
