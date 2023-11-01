import { Component, OnInit } from '@angular/core';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent implements OnInit {

  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  statusString: String
  prioridadeString: String
  dataFechamento: any

  constructor(
    private chamadoService: ChamadoService,
    private toastService: ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;
      this.statusString = this.returnStatus(this.chamado.status);
      this.prioridadeString = this.returnPrioridade(this.chamado.prioridade);
      this.dataFechamento = this.returnDataFechamento(this.chamado.dataFechamento);
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  returnStatus(status: any): string {
    if(status == '0'){
      return 'ABERTO'
    } else if(status == '1'){
      return 'EM ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }

  returnPrioridade(prioridade: any): string {
    if(prioridade == '0'){
      return 'BAIXA'
    } else if(prioridade == '1'){
      return 'MÉDIA'
    } else {
      return 'ALTA'
    }
  }

  returnDataFechamento(data: any): any {
    if(data == null) {
      return '-----'
    }
    return data
  }
}
