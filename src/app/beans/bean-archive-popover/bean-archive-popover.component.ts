import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IBean} from '../../../interfaces/bean/iBean';
import {Bean} from '../../../classes/bean/bean';
import {UIBeanStorage} from '../../../services/uiBeanStorage';
import {ModalController} from '@ionic/angular';
import {UIToast} from '../../../services/uiToast';
import {NgxStarsComponent} from 'ngx-stars';

@Component({
  selector: 'app-bean-archive-popover',
  templateUrl: './bean-archive-popover.component.html',
  styleUrls: ['./bean-archive-popover.component.scss'],
})
export class BeanArchivePopoverComponent implements OnInit {
  public static COMPONENT_ID = 'bean-archive-popover';
  @Input() public bean: IBean;
  @ViewChild('beanRating', {read: NgxStarsComponent, static: false}) public beanRating: NgxStarsComponent;
  public data: Bean = new Bean();


  constructor(private readonly uiBeanStorage: UIBeanStorage,
              private readonly modalController: ModalController,
              private readonly uiToast: UIToast) { }

  public ngOnInit() {

  }
  public ionViewWillEnter(): void {


    if (this.bean !== undefined) {
      this.data.initializeByObject(this.bean);
      if (this.data.rating > 0) {
        this.changedRating();
      }
    }

  }

  public async archive() {
    this.data.finished = true;
    await this.uiBeanStorage.update(this.data);
    this.uiToast.showInfoToast('TOAST_BEAN_ARCHIVED_SUCCESSFULLY');
    this.dismiss();
  }

  public dismiss(): void {
    this.modalController.dismiss({
      dismissed: true
    }, undefined, BeanArchivePopoverComponent.COMPONENT_ID);
  }
  public changedRating() {
    if (typeof(this.beanRating) !== 'undefined') {
      this.beanRating.setRating(this.data.rating);
    }
  }

}
