import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";

export class Login {
  static readonly type = "[Auth] Login";
  constructor(public payload: { username: string; password: string }) {}
}

export class Logout {
  static readonly type = "[Auth] Logout";
}

export interface AuthStateModel {
  isLoggedIn: boolean;
  user: string | null;
}

@State<AuthStateModel>({
  name: "auth",
  defaults: {
    isLoggedIn: false,
    user: null,
  },
})
@Injectable()
export class AuthState {
  @Selector()
  static isLoggedIn(state: AuthStateModel) {
    return state.isLoggedIn;
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    const state = ctx.getState();
    // Aquí puedes realizar la lógica de autenticación
    // Por ejemplo, validar el usuario y contraseña
    const isLoggedIn = true; // Simulación de autenticación exitosa
    const user = action.payload.username; // Simulación de usuario autenticado
    ctx.setState({ ...state, isLoggedIn, user });
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>, action: Logout) {
    const state = ctx.getState();
    ctx.setState({ ...state, isLoggedIn: false, user: null });
  }
}
