import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { IServer } from './services/models/server.model';
import { ServerService } from './services/server/server.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public servers: IServer[];
  public appName: Observable<string> = this._serverService.getAppName();

  constructor(
    private _serverService: ServerService
  ) {
  }

  public ngOnInit(): void {
    this.onGet();
  }

  public onAddServer(name: string): void {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this._generateId()
    });
  }

  public onPost(): void {
    this._serverService.postServers(this.servers)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error );
        }
      );
  }

  public onPut(): void {
    this._serverService.putServers(this.servers)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error );
        }
      );
  }

  public onGet(): void {
    this._serverService.getServers()
      .subscribe(
        (servers: IServer[]) => { // tslint:disable-line deprecation
          this.servers = servers;
        },
        (error) => {
          console.log(error );
        }
      );
  }


  private _generateId(): number {
    return Math.round(Math.random() * 10000);
  }
}
