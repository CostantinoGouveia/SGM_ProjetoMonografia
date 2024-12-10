import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value; // Exemplo: Pega o token do cookie

  if (!token) {
    // Se o token não existir, redireciona para a página de login
    return NextResponse.redirect(new URL('/auth/iniciar-sessao', req.url));
  }

  try{
  const response = await fetch('http://localhost:3000/verifyToken1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Envia o token no cabeçalho
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    // Token inválido ou erro na validação, redireciona para login
    return NextResponse.redirect(new URL('/auth/iniciar-sessao', req.url));
  }

  // Token válido, continua para o próximo handler
  return NextResponse.next();
} catch (error) {
  console.error('Erro ao validar token:', error);
  // Qualquer erro inesperado, redireciona para login
  return NextResponse.redirect(new URL('/auth/iniciar-sessao', req.url));
}
    
}
// Configura o middleware para ser aplicado apenas em rotas específicas
export const config = {
  matcher: ['/','/dashboard/:path*', '/agentes', '/automobilistas', '/viaturas', '/alertas', '/infracao', '/reclamacoes/:path*', '/multas'], // Exemplo: Aplica em "dashboard" e "profile"
};
