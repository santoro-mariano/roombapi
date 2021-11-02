import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";

import { CleanerServiceClient, CleanRequest } from "@app/grpc/cleaner";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

import { BrushInfo } from "../models/brushInfo";
import { CleanType } from "../models/cleanType";

@Injectable({ providedIn: "root" })
export class CleanerService {
  private readonly client: CleanerServiceClient;

  constructor() {
    this.client = new CleanerServiceClient(environment.grpcServer);
  }

  public startSideBrush(): void {
    this.client.startSideBrush(new Empty(), null);
  }

  public stopSideBrush(): void {
    this.client.stopSideBrush(new Empty(), null);
  }

  public getSideBrushInfo(): Promise<BrushInfo> {
    return new Promise<BrushInfo>((resolve, reject) => {
      this.client.getSideBrushInfo(new Empty(), null, (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(response.toObject());
      });
    });
  }

  public startMainBrush(): void {
    this.client.startMainBrush(new Empty(), null);
  }

  public stopMainBrush(): void {
    this.client.stopMainBrush(new Empty(), null);
  }

  public getMainBrushInfo(): Promise<BrushInfo> {
    return new Promise<BrushInfo>((resolve, reject) => {
      this.client.getMainBrushInfo(new Empty(), null, (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(response.toObject());
      });
    });
  }

  public startVacuum(): void {
    this.client.startVacuum(new Empty(), null);
  }

  public stopVacuum(): void {
    this.client.stopVacuum(new Empty(), null);
  }

  public clean(type: CleanType): void {
    const request = new CleanRequest();
    request.setType(type);
    this.client.clean(request, null);
  }

  public readDirtSensor(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.client.readDirtSensor(new Empty(), null, (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(response.getValue());
      });
    });
  }
}
