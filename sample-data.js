/* sample-data.js - Mẫu lời chúc 20/11, danh sách môn học và lưu bút mẫu */

const SUBJECTS_LIST = [
    { id: 'chunhiem', name: 'Thầy/Cô Chủ Nhiệm', icon: '❤️', quote: 'Người cha, người mẹ thứ hai dìu dắt từng bước đi' },
    { id: 'van', name: 'Môn Ngữ Văn', icon: '📖', quote: 'Dạy con biết yêu thương con người qua từng trang sách' },
    { id: 'toan', name: 'Môn Toán Học', icon: '📐', quote: 'Đường đời có trăm phương trình, thầy dạy cách tìm nghiệm chân thực' },
    { id: 'anh', name: 'Môn Tiếng Anh', icon: '🌍', quote: 'Mở cánh cửa vươn ra thế giới rộng lớn' },
    { id: 'ly', name: 'Môn Vật Lý', icon: '⚡', quote: 'Định luật vạn vật hấp dẫn không bằng sự ấm áp của người thầy' },
    { id: 'hoa', name: 'Môn Hóa Học', icon: '🧪', quote: 'Phản ứng tỏa nhiệt ấm áp nhất là tình nghĩa thầy trò' },
    { id: 'sinh', name: 'Môn Sinh Học', icon: '🌱', quote: 'Dạy con trân quý sự kỳ diệu của từng mầm sống' },
    { id: 'su', name: 'Môn Lịch Sử', icon: '🏛️', quote: 'Truyền ngọn lửa tự hào về cội nguồn non sông' },
    { id: 'dia', name: 'Môn Địa Lý', icon: '🗺️', quote: 'Đưa con qua bao nẻo đường quê hương đất nước' },
    { id: 'tin', name: 'Môn Tin Học', icon: '💻', quote: 'Gieo từng dòng code đầu tiên vào ước mơ công nghệ' },
    { id: 'theduc', name: 'Môn Thể Dục', icon: '⚽', quote: 'Rèn luyện ý chí kiên cường và sức khỏe dẻo dai' },
    { id: 'amnhac', name: 'Môn Âm Nhạc / Mỹ Thuật', icon: '🎨', quote: 'Thổi hồn nghệ thuật và sắc màu rực rỡ vào tâm hồn' }
];

const WISH_TEMPLATES = [
    {
        category: 'tri-an-sau-lang',
        title: 'Tri ân sâu lắng & Kính trọng',
        wishes: [
            "Thời gian trôi qua thật nhanh, bụi phấn năm xưa nay đã vương trên mái tóc của Thầy/Cô. Con xin kính chúc Thầy/Cô luôn dồi dào sức khỏe, tràn đầy niềm vui và giữ mãi ngọn lửa nhiệt huyết để tiếp tục chèo lái bao chuyến đò tri thức cập bến vinh quang.",
            "Dẫu mai sau đi bốn phương trời, con vẫn khắc ghi lời dạy ân cần năm ấy của Thầy/Cô. Cảm ơn Thầy/Cô đã bao dung cho những ngây ngô thời áo trắng và gieo vào lòng con niềm tin bước vào đời. Chúc mừng Ngày Nhà giáo Việt Nam 20/11!",
            "Người ta ví thầy cô như người lái đò thầm lặng chở khách qua sông rồi trở về bến cũ. Nhưng với con, từng bài học làm người của Thầy/Cô sẽ mãi là hành trang quý giá nhất theo con suốt cuộc đời. Kính chúc Thầy/Cô một ngày 20/11 thật ấm áp và hạnh phúc!",
            "Nhân ngày 20/11, con xin gửi lời tri ân chân thành nhất từ tận đáy lòng đến Thầy/Cô. Cảm ơn Thầy/Cô không chỉ truyền dạy kiến thức mà còn dạy con bài học về lòng nhân ái, sự chính trực và khát vọng sống có ích cho xã hội."
        ]
    },
    {
        category: 'chu-nhiem',
        title: 'Gửi Thầy/Cô Chủ Nhiệm kính yêu',
        wishes: [
            "Gửi Cô/Thầy chủ nhiệm của chúng con! Cảm ơn Cô/Thầy đã luôn là điểm tựa vững chãi, kiên nhẫn lắng nghe, uốn nắn và bảo bọc lũ 'nhất quỷ nhì ma' chúng con suốt những năm tháng thanh xuân dưới mái trường. Kính chúc Cô/Thầy luôn mạnh khỏe, trẻ mãi không già!",
            "Chúng con biết ngày xưa lớp mình từng khiến Cô/Thầy phải rơi nước mắt và trăn trở nhiều đêm. Giờ đây khi đã trưởng thành bước ra xã hội, chúng con mới thấu hết tấm lòng bao la của người chủ nhiệm. Chúc Cô/Thầy 20/11 luôn ngập tràn tiếng cười và niềm tự hào về chúng con!",
            "Nhớ những buổi sinh hoạt lớp cuối tuần, nhớ ánh mắt lo lắng mỗi mùa thi đến, và nhớ cả nụ cười rạng rỡ của Thầy/Cô ngày chúng con tốt nghiệp. Dù đã ra trường bao năm, chúng con vẫn mãi là những học trò nhỏ bé của Thầy/Cô. Chúc mừng 20/11 Thầy/Cô yêu quý!"
        ]
    },
    {
        category: 'hom-hinh',
        title: 'Kỷ niệm tuổi học trò & Hóm hỉnh',
        wishes: [
            "Gửi Thầy/Cô! Ngày xưa con hay quên làm bài tập về nhà, hay ngủ gật trong tiết học, nhưng riêng ngày 20/11 thì chưa từng quên chúc mừng Thầy/Cô ạ! Kính chúc Thầy/Cô luôn trẻ trung, huyết áp luôn ổn định và không bao giờ gặp phải học sinh 'bá đạo' như con năm ấy!",
            "Thầy/Cô ơi, ngày xưa điểm kiểm tra của con có thể chưa được tròn 10, nhưng tấm lòng kính yêu và biết ơn con dành cho Thầy/Cô thì luôn đạt 100 điểm tuyệt đối! Chúc Thầy/Cô 20/11 nhận được cơn mưa hoa tươi và lời chúc ngọt ngào nhất!",
            "Cảm ơn Thầy/Cô đã 'cứu vớt' con qua bao kỳ thi cam go và bao dung trước những trò nghịch ngợm không hồi kết của lũ học trò quậy phá. Hôm nay 20/11, con xin hứa ngoan ngoãn gửi trọn tình cảm tri ân đến Thầy/Cô ạ!"
        ]
    },
    {
        category: 'loi-xin-loi',
        title: 'Lời xin lỗi & Tạ ơn muộn màng',
        wishes: [
            "Có những lời xin lỗi ngày xưa còn e ngại chưa dám cất tiếng: xin lỗi Thầy/Cô vì những lần cãi lời, những phút giây bồng bột nông nổi khiến Thầy/Cô buồn lòng. Hôm nay con xin gửi cả lời xin lỗi chân thành và lời cảm ơn sâu sắc nhất tới Thầy/Cô kính yêu.",
            "Ngày còn ngồi trên ghế nhà trường, con chưa hiểu hết vì sao Thầy/Cô lại nghiêm khắc đến thế. Giờ đây bước qua những thăng trầm cuộc đời, con mới hiểu sự nghiêm khắc năm ấy chính là chiếc khiên bảo vệ và rèn giũa con nên người. Cảm ơn Thầy/Cô rất nhiều!"
        ]
    },
    {
        category: 'mon-hoc',
        title: 'Đặc trưng theo từng Môn học',
        wishes: [
            "Môn Toán: Chúc Thầy/Cô có sức khỏe vô cực (∞), niềm vui luôn mang giá trị tuyệt đối (|x| > 0), nỗi buồn chỉ là tập rỗng (∅), và tình cảm học trò dành cho Thầy/Cô luôn là hàm đồng biến theo thời gian!",
            "Môn Văn: Chúc Cô/Thầy luôn giữ nét bút mềm mại, câu từ ngọt ngào như suối nguồn trong trẻo, trang giáo án mãi đậm đà chất thơ và cuộc sống luôn chan chứa những nốt nhạc yêu thương!",
            "Môn Tiếng Anh: Wishing my beloved teacher a very happy Vietnamese Teachers' Day! May your days be filled with happiness, success, and joyful moments. Thank you for opening the door to the world for us!",
            "Môn Hóa: Chúc Thầy/Cô luôn có nhiệt độ tinh thần ở trạng thái thăng hoa, nụ cười luôn là chất xúc tác lan tỏa niềm vui, và mối liên kết tình nghĩa thầy trò mãi bền chặt như liên kết kim cương!",
            "Môn Vật Lý: Chúc Thầy/Cô có lực hấp dẫn vô tận, điện trường nhiệt huyết luôn truyền cảm ứng mạnh mẽ, và vận tốc thành công luôn đạt đến giới hạn ánh sáng!"
        ]
    }
];

// Dữ liệu ban đầu cho Bảng Lưu Bút Kỷ Niệm (Lưu trữ và đồng bộ với localStorage)
const INITIAL_MEMORY_NOTES = [
    {
        id: 'note-1',
        author: 'Nguyễn Minh Tuấn',
        classInfo: 'Cựu học sinh 12A1 (Niên khóa 2014 - 2017)',
        target: 'Gửi Thầy Hoàng - Dạy Toán',
        content: 'Thầy ơi, giờ em đã là kỹ sư phần mềm được 5 năm rồi. Nhớ ngày xưa thầy bắt ở lại giải cho bằng được bài hình học không gian mới cho về. Nhờ sự kiên nhẫn phi thường của thầy mà em có tư duy logic vững vàng như hôm nay. Chúc thầy 20/11 thật mạnh khỏe ạ!',
        color: 'yellow',
        likes: 42,
        date: '20/11/2026'
    },
    {
        id: 'note-2',
        author: 'Lê Thu Trang & Nhóm Nữ 12D3',
        classInfo: 'Niên khóa 2017 - 2020',
        target: 'Gửi Cô Mai - Chủ nhiệm & Dạy Văn',
        content: 'Cô Mai ơi! Tụi em nhớ đĩa bánh tráng trộn cô mua cho cả lớp sau mỗi lần thi đua đạt giải Nhất trường. Cô không chỉ dạy Văn hay lay động lòng người mà còn là chuyên gia tâm lý gỡ rối tuổi dậy thì cho lũ con gái chúng em. Yêu cô rất nhiều!',
        color: 'pink',
        likes: 58,
        date: '19/11/2026'
    },
    {
        id: 'note-3',
        author: 'Trần Đức Anh ("Học sinh cá biệt")',
        classInfo: 'Cựu học sinh K35',
        target: 'Gửi Thầy Nghĩa - Dạy Hóa & Bí thư Đoàn',
        content: 'Năm lớp 11 em suýt bị đuổi học vì đánh nhau, chính thầy đã đứng ra bảo lãnh và nói với em: "Em là đứa trẻ tốt, thầy tin em làm được điều lớn lao hơn". Câu nói ấy đã thay đổi hoàn toàn cuộc đời em. Cảm ơn thầy vì đã không từ bỏ em ngày ấy!',
        color: 'blue',
        likes: 89,
        date: '18/11/2026'
    },
    {
        id: 'note-4',
        author: 'Đặng Phương Thảo',
        classInfo: 'Cựu học sinh THPT Chuyên',
        target: 'Gửi Cô Hương - Dạy Tiếng Anh',
        content: 'Chúc cô Hương 20/11 luôn xinh đẹp, rạng rỡ và tràn ngập hạnh phúc. Nhờ cô truyền cảm hứng mà từ một đứa sợ phát âm tiếng Anh, nay em đã giành được học bổng du học và luôn tự hào kể về cô giáo cấp ba của mình!',
        color: 'green',
        likes: 35,
        date: '20/11/2026'
    },
    {
        id: 'note-5',
        author: 'Tập thể Lớp 12B5',
        classInfo: 'Khóa 2010 - 2013',
        target: 'Gửi Thầy Thành - Hiệu trưởng kính mến',
        content: 'Kính chúc Thầy Thành dù đã nghỉ hưu vẫn luôn dồi dào sức khỏe, an yên bên gia đình. Lớp 12B5 năm ấy hẹn một ngày gần nhất sẽ về thăm căn nhà nhỏ đầy cây xanh của thầy!',
        color: 'purple',
        likes: 71,
        date: '17/11/2026'
    }
];

// Danh sách các thẻ ký ức trong Chiếc Hộp Thời Gian
const TIME_CAPSULE_CARDS = [
    {
        title: 'Bụi Phấn Vương Mái Tóc',
        icon: '✨',
        frontDesc: 'Hình ảnh thân thương mỗi giờ đứng lớp',
        backText: '"Có hạt bụi nào rơi trên bục giảng, có hạt bụi nào vương trên tóc thầy..." Bài hát năm nào cất lên vẫn làm cay khóe mắt. Bụi phấn trắng bay cho tóc thầy thêm bạc, để đàn em thơ lớn khôn từng ngày.'
    },
    {
        title: 'Tiếng Trống Trường Vọng Về',
        icon: '🥁',
        frontDesc: 'Nhịp đập rộn rã của tuổi áo trắng',
        backText: 'Ba tiếng trống giục giã vào lớp, từng hồi trống vang rền báo hiệu giờ ra chơi ríu rít... Sau bao năm bươn chải nơi đô thị náo nhiệt, tiếng trống trường xưa vẫn là thanh âm thanh bình và tha thiết nhất.'
    },
    {
        title: 'Cuốn Sổ Đầu Bài & Lời Phê',
        icon: '📝',
        frontDesc: 'Nỗi sợ ngây ngô và kỷ niệm khó quên',
        backText: 'Những dòng nhận xét uốn nắn từng nét chữ, từng lần kiểm tra bài cũ thót tim, hay lời khen "Có tiến bộ" được gạch chân đỏ thắm... Tất cả đã trở thành động lực dìu bước con nên người.'
    },
    {
        title: 'Chiếc Áo Trắng Ký Kín Tên',
        icon: '👕',
        frontDesc: 'Lưu bút nghẹn ngào ngày bế giảng',
        backText: 'Ngày chia tay mùa hạ, ai cũng tranh nhau ký tên và viết những lời chúc vụng về lên lưng áo đồng phục. Chiếc áo năm ấy nay đã ố màu theo thời gian, nhưng ký ức về thầy cô và bạn bè thì vẹn nguyên mãi mãi.'
    },
    {
        title: 'Cơn Mưa Rào Mùa Hạ',
        icon: '🌧️',
        frontDesc: 'Khúc giao mùa chia tay tuổi học trò',
        backText: 'Những cánh phượng đỏ rực rơi đầy sân trường ướt mưa. Thầy cô đứng ở hành lang nhìn theo đàn học trò chuẩn bị bay vào đời với ánh mắt vừa tự hào, vừa bịn rịn chẳng nỡ rời xa.'
    },
    {
        title: 'Bài Học Làm Người Đầu Đời',
        icon: '🌱',
        frontDesc: 'Hành trang vô giá theo suốt cuộc đời',
        backText: 'Công thức toán hay câu chữ văn học có thể mai một theo năm tháng, nhưng bài học về lòng biết ơn, sự trung thực và cách đối nhân xử thế mà thầy cô dạy dỗ sẽ mãi là la bàn dẫn lối cho con.'
    }
];
