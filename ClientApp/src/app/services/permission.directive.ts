import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import { HelperService } from './helper.service';

@Directive({
    selector: '[permission]'
})
export class PermissionDirective {

    constructor(private helperService: HelperService, private _viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) { }

    @Input()
    set permission(p: string) {
        this._updateView(p);
    }

    private _updateView(p: string) {
        const hasPermission = this.hasPermission(p);
        this._viewContainer.clear();

        if (hasPermission) {
            this._viewContainer.createEmbeddedView(this.templateRef);
        }
    }

    hasPermission(permission: string): boolean {
        const currentUserPermissions = this.helperService.getPermissions();
        return currentUserPermissions.indexOf(permission) > -1;
    }


}
