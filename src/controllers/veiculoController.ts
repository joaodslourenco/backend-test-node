import { Request, Response } from "express";
import { VeiculoRepository } from "../repositories/veiculoRepository";
import { VeiculoServices } from "../services/veiculoServices";

class VeiculoController {
  static listVeiculos = async (req: Request, res: Response) => {
    try {
      const vehicles = await VeiculoRepository.getAllVehicles();
      return res.status(200).json(vehicles);
    } catch (err) {
      return res
        .status(400)
        .send({ message: `${err} - Erro ao carregar veículos.` });
    }
  };

  static listVeiculoById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const vehicle = await VeiculoRepository.getVehicleById(id);
      return res.status(200).json(vehicle);
    } catch (err) {
      return res
        .status(400)
        .send({ message: `${err} - erro ao pesquisar veículo.` });
    }
  };

  static addVeiculo = async (req: Request, res: Response) => {
    const veiculoServices = new VeiculoServices();
    try {
      const newVehicle = req.body;
      await veiculoServices.addVehicle(newVehicle);
      return res.status(201).send({ vehicle: newVehicle });
    } catch (err) {
      return res
        .status(401)
        .send({ message: `${err} - falha ao registrar veículo.` });
    }
  };

  static updateVeiculo = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      await VeiculoRepository.getVehicleByIdAndUpdate(id, { $set: req.body });
      return res.status(200).send("Veículo atualizado com sucesso.");
    } catch (err) {
      return res
        .status(401)
        .send({ message: `${err} - falha ao atualizar veículo.` });
    }
  };

  static deleteVeiculo = async (req: Request, res: Response) => {
    const veiculoServices = new VeiculoServices();
    try {
      const id = req.params.id;
      const vehicle = await VeiculoRepository.getVehicleById(id);
      if (vehicle) {
        await veiculoServices.deleteVehicle(vehicle);
      }
      return res.status(200).send({ message: "Veículo deletado com sucesso." });
    } catch (err) {
      return res
        .status(500)
        .send({ message: `${err} - falha ao deletar veículo.` });
    }
  };
}

export default VeiculoController;
