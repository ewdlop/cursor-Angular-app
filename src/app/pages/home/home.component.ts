import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  features = [
    {
      title: '用户认证',
      description: '完整的登录、注册和密码重置功能',
      icon: 'fas fa-user-shield'
    },
    {
      title: '响应式设计',
      description: '完美适配各种设备尺寸',
      icon: 'fas fa-mobile-alt'
    },
    {
      title: '现代化UI',
      description: '使用最新的设计趋势和动画效果',
      icon: 'fas fa-paint-brush'
    }
  ];
}
