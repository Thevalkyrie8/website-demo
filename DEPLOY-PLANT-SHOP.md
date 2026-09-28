# Plant Shop — bản merge để triển khai GitHub Pages

Đích: `Thevalkyrie8/website-demo`, nhánh `main`.

## Thay đổi

- Mã nguồn được gửi ngày 28/09/2026 nằm trong `plant-shop/`, gồm Next.js, NestJS, Prisma và ảnh sản phẩm.
- Giữ nguyên mã Vite cũ trong `src/`; có thể build bằng `npm run build:legacy`.
- `npm run build` tạo bản demo Next.js tĩnh tại `dist/` với đường dẫn `/website-demo`.
- Build diễn ra trong `.pages-build/`, không sửa mã ứng dụng gốc.
- Giữ các trang cửa hàng, sản phẩm, bài viết, giỏ hàng và dịch vụ; xuất trang sản phẩm theo danh mục có sẵn.
- Bản công khai chỉ là demo giao diện: chặn gửi đơn, tư vấn và đăng nhập/đăng ký; không xuất admin, middleware hoặc API. Giỏ hàng dùng dữ liệu trình duyệt.
- Giữ workflow GitHub Pages sẵn có; bỏ thao tác ghi đè trang 404.

## Chạy và triển khai

Yêu cầu Node.js 20.11 trở lên.

```sh
npm ci
npm run build
```

Sau khi commit lên `main`, workflow `.github/workflows/deploy.yml` build và đẩy `dist/` lên nhánh `gh-pages`. GitHub Pages cần chọn nguồn `gh-pages` tại Settings → Pages.

Địa chỉ dự kiến: https://thevalkyrie8.github.io/website-demo/

## Triển khai

Workflow GitHub Pages tự chạy khi cập nhật nhánh main. Xem trạng thái mới nhất trong tab Actions của repository.

Backend và đăng nhập thật chưa được triển khai/kiểm định trong lần bàn giao demo này. Không sử dụng bản demo để tiếp nhận giao dịch thật.

## Kiểm tra đã hoàn tất

- `npm run build`: thành công; Next.js tạo 41 trang tĩnh.
- Kiểm tra các liên kết nội bộ và tệp được tham chiếu trong HTML xuất ra: không thiếu đích.
- Không xuất thư mục admin hoặc API ra bản công khai.
