import { HydratedDocument } from "mongoose";
import estabelecimentos, { IEstabelecimento } from "../models/Estabelecimento";

export class EstabelecimentoRepository {
  static async getEstabelecimentosList() {
    return estabelecimentos.find().populate("veiculos");
  }

  static async getEstabelecimentoById(id: string) {
    return estabelecimentos.findById(id).populate("veiculos");
  }

  static async addEstabelecimento(
    estabelecimento: HydratedDocument<IEstabelecimento>,
  ) {
    await estabelecimento.save();
  }

  static async getEstabelecimentoByIdAndUpdate(id: string, data: any) {
    return estabelecimentos.findByIdAndUpdate(id, data);
  }

  static async getEstabelecimentoByIdAndDelete(id: string) {
    await estabelecimentos.findByIdAndDelete(id);
  }
}
