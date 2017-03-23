import './polyfills';
import 'rxjs/Rx';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AuthService  } from "./auth/auth.service";

import { AppModule } from "./app.module";

platformBrowserDynamic().bootstrapModule(AppModule);