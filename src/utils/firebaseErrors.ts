export function mapFirebaseError(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'El correo electrónico no es válido';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Correo o contraseña incorrectos';
    case 'auth/email-already-in-use':
      return 'Este correo ya está registrado';
    case 'auth/weak-password':
      return 'La contraseña debe tener al menos 6 caracteres';
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Intenta más tarde';
    case 'auth/network-request-failed':
      return 'Error de conexión. Verifica tu internet';
    case 'auth/email-already-in-use':
      return 'El correo electrónico ya se encuentra en uso, favor de verificar.';
    default:
      return 'Ocurrió un error. Intenta de nuevo';
  }
}
